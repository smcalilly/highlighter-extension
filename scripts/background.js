function captureHighlight(selection) {
  const highlight = {
    text: selection.selectionText, 
    url: selection.pageUrl
  }

  return highlight;
}

async function postFetch(highlight, jwt) {
  let url = 'http://localhost:3000/highlights';

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

  if (response.ok) {
    successMessage();
  } else {
    errorMessage(response)
  }
}

function successMessage() {
  const message = {
    type: "basic",
    iconUrl: "images/yellow-box.png",
    title: "Highlight saved!",
    message: "Keep on reading.",
  }

  chrome.notifications.create(message);
}

function errorMessage(error) {
  const message = {
    type: "basic",
    iconUrl: "images/yellow-box.png",
    title: 'Unable to save highlight',
    message: "This shouldn't happen! Please contact us if the error persists.",
  }

  chrome.notifications.create(message);

  // send error to server
}

// add context menu and listen to text selection
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "addHighlight",
    "title": "Add Highlight",
    "contexts": ["selection"]
  });
});

// capture highlight when a selction is added from the context menu
// and send it to the rails api
chrome.contextMenus.onClicked.addListener(function (selection) {
  const jwt = localStorage.getItem('highlighterJWT');

  if (jwt == null) {
    window.open(
      'ui/newIndex.html', 
      'extension_popup', 
      'width=300,height=400,status=no,scrollbars=yes,resizable=no'
    );
  } else {
    const highlight = captureHighlight(selection);
    postFetch(highlight, jwt);
  }
});