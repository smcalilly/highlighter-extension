class ApiService {
  constructor(token) {
    this.domain = 'https://highlighter.online';
    this.token = token;
    this.requestHeaders =  {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
    };
  }

  parseResponseStatus(response) {
    if (response.status === 201 || response.status === 200) {
      return response
    } else if (response.status === 401) {
      throw Error('Invalid credentials.')
    }
    else {
      throw Error('Something weird happened.')
    }
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
    let currentPage = localStorage.getItem('hiPage')
    
    const url = `${this.domain}/highlights/current?url=${currentPage}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: this.requestHeaders,
    });

    return this.parseResponseStatus(response);
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