// const RailsRanger = require('node_modules/rails-ranger')

// const railsAPI = new RailsRanger({
//   axios: {
//     baseURL: 'http://localhost:3000/',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     }
//   }
// })

// console.log(railsAPI);

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

// postHighlight = async (highlight) => {
//   console.log('post highlight')
//   console.log(highlight)

//   let formData = new FormData();
//   formData.append('highlight', JSON.stringify(highlight));
//   // console.log(formData)

//   // let formData = {
//   //   highlight: highlight
//   // }

  
//   console.log(highlight.text)
//   console.log(highlight.url)

//   const response = await fetch('http://localhost:3000/highlights', {
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     method: 'POST',
//     body: JSON.stringify({highlight: highlight}),
//     mode: 'no-cors'
//   });

//   console.log(response)

//   return await response.json();
// }

postHighlight = (highlight) => {
  const request = new XMLHttpRequest();
  
  request.open('POST', 'http://localhost:3000/highlights');

  request.setRequestHeader('Access-Control-Allow-Origin', '*');
  request.setRequestHeader('Accept', 'application/json');
  request.setRequestHeader('Content-Type', 'application/json');

  request.send(JSON.stringify({highlight: highlight}))
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