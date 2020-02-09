function formatHighlight(selection) {
  const formattedHighlight = {
      text: selection.selectionText, 
      url: selection.pageUrl
    }

  return JSON.stringify({ highlight: formattedHighlight });
}

function parseResponseStatus(response) {
  let notification = {}

  if (response.status === 201) {
    notification = {
      title: 'Highlight saved!',
      message: 'Keep on reading.'
    }
  } else if (response.status === 401) {
    notification = {
      title: 'Unable to save highlight!',
      message: 'Please login via the extension popup.'
    }
  }
  else {
    notification = {
      title: 'Unable to save highlight!',
      message: 'This shouldn\'t happen. Please contact us if the error persists.'
    }
  }

  return notification;
}

function notifyUser(notification) {
  const message = {
    type: 'basic',
    iconUrl: 'images/highlight-logo.png',
    title: notification.title,
    message: notification.message,
  }

  chrome.notifications.create(message);
}