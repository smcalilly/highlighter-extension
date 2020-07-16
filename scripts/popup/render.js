const popup = new PopupWindow()
popup.render('loading')

document.addEventListener('DOMContentLoaded', async function() {
  popup.determineAuthStateAndRender()
});