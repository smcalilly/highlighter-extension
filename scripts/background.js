function initializeAPI() {
  const token = localStorage.getItem('highlighterJWT');
  const clientAPI = new ApiService(token);
  return clientAPI;
}

// all the good stuff happens here
async function createHighlight(textSelection) {
  const highlight = await formatHighlight(textSelection);
  const clientAPI = await initializeAPI();
  const response = await clientAPI.postHighlight(highlight);
  const notification = await parseResponseStatus(response);  
  await notifyUser(notification);
}

// add context menu for user's "right click" action
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
chrome.runtime.onInstalled.addListener(function(reason) {
  if (reason === 'install') {
    chrome.tabs.create({ url: 'https://www.highlighter.online/users/install' });
  }
})

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

// background task to send request to api to 1) see if auth token is still valid
// and 2) retrieve highlights for current webpage
chrome.webNavigation.onDOMContentLoaded.addListener(async function(url) {
  const clientAPI = initializeAPI();

  // send request to see if token is still valid for current user
  let currentPage = `url: ${url.url}`
  const response = await clientAPI.getHighlightsForCurrentPage(currentPage);

  renderApp(response, clientAPI);
}) 

// TODO: refactor this to handle app state in a better way
function renderApp(response, clientAPI) {
  // reset auth token
  if (response.status !== 200) {
    localStorage.setItem('highlighterJWT', null);
    clientAPI.token = null;
    // TODO: send message to popup with login state
  }

  // TODO: retrieve any highlights for the current webpage 
  // so we can render the highlights in the popup and/or content script
}