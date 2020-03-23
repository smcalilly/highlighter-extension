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