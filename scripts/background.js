function captureHighlight(selection) {
  const highlight = {
    text: selection.selectionText, 
    url: selection.pageUrl
  }

  return highlight;
}

async function postFetch(highlight, jwt) {
  const url = 'http://localhost:3000/highlights';

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
    type: 'basic',
    iconUrl: 'images/yellow-box.png',
    title: 'Highlight saved!',
    message: 'Keep on reading.',
  }

  chrome.notifications.create(message);
}

function errorMessage(error) {
  const message = {
    type: 'basic',
    iconUrl: 'images/yellow-box.png',
    title: 'Unable to save highlight',
    message: 'This should not happen! Please contact us if the error persists.',
  }

  chrome.notifications.create(message);
}

// add context menu and listen to text selection
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    'id': 'addHighlight',
    'title': 'Add Highlight',
    'contexts': ['selection']
  });
});

// capture highlight and send it to the api
chrome.contextMenus.onClicked.addListener(function (selection) {
  const jwt = localStorage.getItem('highlighterJWT');

  if (jwt == null) {
    // chrome won't allow popup to open programmatically
    // so open a small login window
    window.open(
      'ui/login.html', 
      'extension_popup', 
      'width=300,height=400,status=no,scrollbars=yes,resizable=no'
    );
  } else {
    const highlight = captureHighlight(selection);
    postFetch(highlight, jwt);
  }
});