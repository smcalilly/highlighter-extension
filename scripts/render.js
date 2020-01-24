PAGES = {
  login: {
    page: document.querySelector('#login')
  },
  successful: {
    page: document.querySelector('#successful')
  },
  error: {
    page: document.querySelector('#error')
  }
};

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