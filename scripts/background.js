function captureHighlight(textSelection) {
  const jwt = localStorage.getItem('highlighterJWT');
  
  if (jwt == null) {
    const notification = {
      title: 'Unable to save highlight!',
      message: 'Please login to save.'
    }
    createNotification(notification);
  } else {
    postHighlight(formatHighlight(textSelection), jwt);
  }
}

function formatHighlight(selection) {
  console.log(selection);
  const highlight = {
      text: selection.selectionText, 
      url: selection.pageUrl
    }

  return highlight;
}

async function postHighlight(highlight, jwt) {
  const url = 'https://www.highlighter.online/highlights';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt,
    },
    body: JSON.stringify({ highlight: highlight })
  });

  let notification = {}

  if (response.ok) {
    notification = {
      title: 'Highlight saved!',
      message: 'Keep on reading.'
    }
  } else {
    notification = {
      title: 'Unable to save highlight!',
      message: 'This should not happen. Please contact us if the error persists.'
    }
  }

  createNotification(notification);
}

function createNotification(notification) {
  const message = {
    type: 'basic',
    iconUrl: 'images/highlight-logo.png',
    title: notification.title,
    message: notification.message,
  }

  chrome.notifications.create(message);
}

// add context menu
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    'id': 'addHighlight',
    'title': 'Save Highlight',
    'contexts': ['selection']
  });
});

// listen to contextMenu for the text selection event
chrome.contextMenus.onClicked.addListener(function(textSelection) {
  captureHighlight(textSelection);
});

// redirect user to app's signup page upon download
chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.create({ url: 'https://www.highlighter.online/users/install' });
})

// keyboard shortcut to save highlight
chrome.commands.onCommand.addListener(function (command) {
  if (command === 'save-highlight') {
    // must pass the message to the content script in order to interact with DOM
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { method: "getSelection" }, function (response) {
        // format response to pass into captureHighlight
        console.log()
        const selection = {
          selectionText: response.data,
          pageUrl: tabs[0].url
        }
        captureHighlight(selection);
      });
    });
  }
});