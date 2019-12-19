captureHighlight = (selection, tab) => {
  const highlight = {
      text: selection.selectionText, 
      url: selection.pageUrl
  }

  return highlight;
}

postHighlight = (highlight) => {
    const jwt = localStorage.getItem('highlighterJWT');
    const request = new XMLHttpRequest();
    
    request.open('POST', 'https://www.highlighter.online/highlights');
    request.setRequestHeader('Access-Control-Allow-Origin', '*');
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + jwt);
    request.send(JSON.stringify({highlight: highlight}));

    request.onload = function() {
      if (request.status === 201) {
        saveSuccessNotification();
      }
    }
}

function saveSuccessNotification() {
  const options = {
    type: "basic",
    iconUrl: "images/yellow-box.png",
    title: "Highlight saved!",
    message: "Keep on reading.",
  }

  chrome.notifications.create(options);
}

// add context menu and listen to text selection
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "addHighlight",
    "title": "Add Highlight",
    "contexts": ["selection"]
  });
})

// capture highlight when a selction is added from the context menu
// and send it to the rails api
chrome.contextMenus.onClicked.addListener(function (selection) {
  const jwt = localStorage.getItem('highlighterJWT');

  if (jwt == null) {
    window.open('ui/newIndex.html', 'extension_popup', 'width=300,height=400,status=no,scrollbars=yes,resizable=no');
  } else {
    const highlight = captureHighlight(selection);
    postHighlight(highlight);
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