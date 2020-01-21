async function captureHighlight(textSelection) {
  let jwt = localStorage.getItem('highlighterJWT');
  
  if (jwt == null) {
    const notification = {
      title: 'Unable to save highlight!',
      message: 'Please login to save!'
    }
    createNotification(notification)
    // jwt = await forceLogin()
    // console.log(jwt);
    // await postHighlight(formatHighlight(textSelection), jwt);
  } else {
    postHighlight(formatHighlight(textSelection), jwt);
  }
}

// async function forceLogin(callback) {
//   // open a small window so user can login, instead of the popup 
//   // since chrome won't allow a popup to open programmatically
//   await window.open(
//     'ui/login.html',
//     'extension_popup',
//     'width=300,height=400,status=no,scrollbars=yes,resizable=no'
//   );

//   let jwt = await localStorage.getItem('highlighterJWT')

//   console.log('forceLogin', jwt)

//   return jwt;
// }

function formatHighlight(selection) {
  const highlight = {
    text: selection.selectionText, 
    url: selection.pageUrl
  }

  return highlight;
}

async function postHighlight(highlight, jwt) {
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

  const notification = {}

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
    iconUrl: 'images/yellow-box.png',
    title: notification.title,
    message: notification.message,
  }

  chrome.notifications.create(message);
}

// function successMessage() {
//   const message = {
//     type: 'basic',
//     iconUrl: 'images/yellow-box.png',
//     title: 'Highlight saved!',
//     message: 'Keep on reading.',
//   }

//   chrome.notifications.create(message);
// }

// function errorMessage(error) {
//   const message = {
//     type: 'basic',
//     iconUrl: 'images/yellow-box.png',
//     title: 'Unable to save highlight',
//     message: 'This should not happen! Please contact us if the error persists.',
//   }

//   chrome.notifications.create(message);
// }

// add context menu
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    'id': 'addHighlight',
    'title': 'Add Highlight',
    'contexts': ['selection']
  });
});

// listen to contextMenu for the text selection event
chrome.contextMenus.onClicked.addListener(function(textSelection) {
  captureHighlight(textSelection);
});