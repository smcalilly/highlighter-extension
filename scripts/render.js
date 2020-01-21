PAGES = {};
PAGES.login = {};
PAGES.login.page = document.querySelector('#login');
PAGES.authenticated = {};
PAGES.authenticated.page = document.querySelector('#authenticated');
PAGES.error = {};
PAGES.error.page = document.querySelector('#error');

function render(state = 'login') {
  for (let page in PAGES) {
    if (PAGES.hasOwnProperty(page)) {
      PAGES[page].page.classList.remove('active');
    }
  }

  PAGES[state].page.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
  render();
});