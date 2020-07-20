const popup = new PopupWindow()
popup.render('loading')

// render on page load, depending on authentication state
document.addEventListener('DOMContentLoaded', async function() {
  popup.determineAuthStateAndRender()
});