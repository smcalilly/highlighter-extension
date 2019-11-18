captureHighlight = (selection, tab) => {
  const highlight = {
      text: selection.selectionText, 
      url: selection.pageUrl
  }

  return highlight;
}

postHighlight = (highlight) => {
  const request = new XMLHttpRequest();

  request.open('POST', 'http://localhost:3000/highlights');

  request.setRequestHeader('Access-Control-Allow-Origin', '*');
  request.setRequestHeader('Accept', 'application/json');
  request.setRequestHeader('Content-Type', 'application/json');

  request.send(JSON.stringify({highlight: highlight}))
}

// add context menu and listen to text selection
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "addHighlight",
    "title": "Add Highlight",
    "contexts": ["selection"]
  })
})

// capture highlight when a selction is added from the context menu
chrome.contextMenus.onClicked.addListener(function(selection) {
  try {
    const highlight = captureHighlight(selection)
    postHighlight(highlight);
  } catch {
    console.log(error);
  }
});

// chrome setup
chrome.runtime.onInstalled.addListener(function() {
  // replace all rules
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // with a new rule
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // and shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});