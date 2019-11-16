// chrome.browserAction.onClicked.addListener(function(tab) {
//   // Send a message to the active tab
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     let activeTab = tabs[0];
//     chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
//   });
// });

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if( request.message === "open_new_tab" ) {
//       chrome.tabs.create({"url": request.url});
//     }
//   }
// );

console.log('i run')

function captureHighlight(highlight, tab) {
  console.log('captureHighlight')
  console.log(highlight);
  console.log(highlight.selectionText)
  let highlighted = highlight.selectionText
  chrome.storage.local.set({"highlight": highlight});

  chrome.storage.local.get(["highlight"], function(result) {
    console.log(result);
    console.log('value is ' + result.highlight);
  })
}

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "addHighlight",
    "title": "Add Highlight",
    "contexts": ["selection"]
  })
})

chrome.contextMenus.onClicked.addListener(function(selection) {
  captureHighlight(selection)
});

chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});