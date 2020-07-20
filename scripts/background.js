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

// save the current page to local storage so the popup rendering
// can request highlighter api to see if the user has any highlights for that page
chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(currentTab) {
    localStorage.setItem('hiPage', currentTab.url)
  })
});