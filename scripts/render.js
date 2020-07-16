PAGES = {
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
};

function render(state = 'login') {
  for (let page in PAGES) {
    if (PAGES.hasOwnProperty(page)) {
      console.log('page', page)
      PAGES[page].page.classList.remove('active');
    }
  }

  PAGES[state].page.classList.add('active');
}

class ApiService {
  constructor(token) {
    this.domain = 'https://www.highlighter.online';
    this.token = token;
    this.requestHeaders =  {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
    };
  }

  async getHighlights() {
    const url = `${this.domain}/highlights`;

    const response = await fetch(url, {
        method: 'GET',
        headers: this.requestHeaders,
    });

    return response;
  }

  async getHighlightsForCurrentPage(params) {
    console.log(params)
    const url = `${this.domain}/highlights/current?url=${params}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: this.requestHeaders,
    });

    return response;
  }

  async postHighlight(requestBody) {
    const url = `${this.domain}/highlights`;
  
    const response = await fetch(url, {
      method: 'POST',
      headers: this.requestHeaders,
      body: requestBody
    });
  
    return response;
  }

  async loginUser() {

  }
}

function initializeAPI() {
  const token = localStorage.getItem('highlighterJWT');
  const clientAPI = new ApiService(token);
  return clientAPI;
}

function determineAuthState(render) {
  if (localStorage.getItem('highlighterJWT')) {
    const api = initializeAPI()

    api.getHighlights().then((response) => {
      render('loggedIn')
      return
    }).catch((error) => {
      render('login error')
      console.log('error', error)
      return
    })
  }
}

document.addEventListener('DOMContentLoaded', async function() {
  function render(state) {
    for (let page in PAGES) {
      if (PAGES.hasOwnProperty(page)) {
        console.log('page', page)
        PAGES[page].page.classList.remove('active');
      }
    }

    PAGES[state].page.classList.add('active');
  }
  render('loading')

  determineAuthState(render)
});