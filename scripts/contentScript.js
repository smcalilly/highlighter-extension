chrome.runtime.onMessage.addListener( 
  function(request, sender, sendResponse) { 
    console.log('context script', request)
      if (request.method == "getSelection") {
        console.log(request)
        sendResponse({data: window.getSelection().toString()});
      } else {
        sendResponse({});
      }
  }
)