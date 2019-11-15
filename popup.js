const renderHighlightList = () => {
  let highlight = chrome.storage.local.get(["highlight"]);
  console.log(highlight)
}

renderHighlightList();