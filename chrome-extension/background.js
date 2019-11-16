function captureHighlight(selection, tab) {
  console.log('captureHighlight')
  console.log(selection);
  console.log(selection.selectionText)

  const highlight = {
      text: selection.selectionText, 
      url: selection.pageUrl
  }

  return highlight;

  // chrome.storage.local.set({"highlight": highlight});

  // chrome.storage.local.get(["highlight"], function(result) {
  //   console.log(result);
  //   console.log('value is ' + result.highlight);
  // })
}

async function postHighlight(highlight) {
  console.log('post highlight')
  console.log(highlight)

  let formData = new FormData();
  formData.append('highlight', JSON.stringify(highlight));
  console.log(formData)
  // Object.keys(highlight).forEach(key => {
  //   formData.append(key, highlight[key])
  // })
  
  

  console.log(highlight.text)
  console.log(highlight.url)

  const response = await fetch('http://localhost:3000/highlights', {
    method: 'POST',
    body: formData,
  });

  return await response.json();
}

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "addHighlight",
    "title": "Add Highlight",
    "contexts": ["selection"]
  })
})

chrome.contextMenus.onClicked.addListener(function(selection) {
  try {
    const highlight = captureHighlight(selection)
    postHighlight(highlight);
  } catch {
    console.log(error);
  }
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