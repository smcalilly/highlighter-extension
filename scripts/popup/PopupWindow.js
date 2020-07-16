class PopupWindow {
  constructor() {
    this.pages = {
      login: {
        page: document.querySelector('#login')
      },
      successful: {
        page: document.querySelector('#successful')
      },
      error: {
        page: document.querySelector('#error')
      },
      loggedIn: {
        page: document.querySelector('#loggedIn')
      },
      loading: {
        page: document.querySelector('#loading')
      }
    },
    this.api = new ApiService(localStorage.getItem('highlighterJWT'))
  }

  render(state = 'login') {
    const PAGES = this.pages;

    for (let page in PAGES) {
      if (PAGES.hasOwnProperty(page)) {
        PAGES[page].page.classList.remove('active');
      }
    }
  
    PAGES[state].page.classList.add('active');
  }

  determineAuthStateAndRender() {
    if (localStorage.getItem('highlighterJWT')) {
      this.api.getHighlights().then((response) => {
        this.render('loggedIn')
        return
      }).catch((error) => {
        this.render('login')
        console.log('error', error)
        return
      })
    }
  }
}