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
      dashboard: {
        page: document.querySelector('#dashboard'),
        highlights: []
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

    if (state == 'dashboard') {
      PAGES.dashboard.highlights.forEach((highlight) => {
        const div = document.createElement('div')
        div.classList.add('highlight')
        const highlightText = document.createTextNode(highlight.text)
        div.appendChild(highlightText)
        let currentDiv = document.getElementById('dashboard')
        currentDiv.appendChild(div)
      })
    }
  }

  determineAuthStateAndRender() {
    if (localStorage.getItem('highlighterJWT')) {
      this.api.getHighlightsForCurrentPage().then(async (response) => {
        return response.json()
      }).then(async (data) => {
        if (data.length > 0) {
          console.log(data)
          this.pages.dashboard.highlights = data
        } else {
          this.pages.dashboard.highlights.push({text: 'No highlights saved for this page.'})
        }
        await this.render('dashboard')
        return
      })
      .catch((error) => {
        console.log('error', error)
        this.render('login')
        return
      })
    } else {
      this.render('login')
    }
  }
}