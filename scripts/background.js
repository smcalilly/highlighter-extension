require(['./scripts/utility/apiService.js'], function(ApiService) {
  ApiService;
})

console.log('i ran')
console.log('jwt', localStorage.getItem('highlighterJWT'))

function formatHighlight(selection) {
  const formattedHighlight = {
      text: selection.selectionText, 
      url: selection.pageUrl
    }

  return JSON.stringify({ highlight: formattedHighlight });
}

function parseResponseStatus(response) {
  let notification = {}

  if (response.status === 201) {
    notification = {
      title: 'Highlight saved!',
      message: 'Keep on reading.'
    }
  } else if (response.status === 401) {
    notification = {
      title: 'Unable to save highlight!',
      message: 'Please login via the extension popup.'
    }
  }
  else {
    notification = {
      title: 'Unable to save highlight!',
      message: 'This shouldn\'t happen. Please contact us if the error persists.'
    }
  }

  return notification;
}

function notifyUser(notification) {
  const message = {
    type: 'basic',
    iconUrl: 'images/highlight-logo.png',
    title: notification.title,
    message: notification.message,
  }

  chrome.notifications.create(message);
}

async function initializeAPI() {
  const token = localStorage.getItem('highlighterJWT');
  const api = new ApiService(token);

  // send request to see if token is still valid for current user
  // TODO: and retrieve any highlights for the current webpage 
  // so we can render the highlights in the popup and/or content script
  const response = await api.getHighlights();

  if (response.status !== 200) {
    // reset auth token
    localStorage.clear();
    api.token = null;
    // send message to popup with login state
  }

  return api;
}

// all the good stuff happens here
// capture textSelection from the context menu
// format textSelection into a "highlight"
// setup client api
// send the highlight to the server api
// handle the server's response
// tell the user what's up!
async function createHighlight(textSelection) {
  const highlight = await formatHighlight(textSelection);
  const clientAPI = await initializeAPI();
  const response = await clientAPI.postHighlight(highlight);
  const notification = await parseResponseStatus(response);  
  await notifyUser(notification);
}

// add context menu for user "right click" action
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    'id': 'addHighlight',
    'title': 'Save Highlight',
    'contexts': ['selection']
  });
});

// listen to contextMenu for the text selection event
chrome.contextMenus.onClicked.addListener(function(textSelection) {
  createHighlight(textSelection);
});

// redirect user to app's signup page upon download
// chrome.runtime.onInstalled.addListener(function() {
//   chrome.tabs.create({ url: 'https://www.highlighter.online/users/install' });
// })

// keyboard shortcut to save highlight
chrome.commands.onCommand.addListener(function (command) {
  if (command === 'save-highlight') {

    // get the current tab in the browser window
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

      // must pass the message to the content script in order to interact with DOM
      chrome.tabs.sendMessage(tabs[0].id, { method: 'getSelection' }, function (response) {
        
        // format response to create highlight
        const selection = {
          selectionText: response.data,
          pageUrl: tabs[0].url
        }

        createHighlight(selection);
      });
    });
  }
});