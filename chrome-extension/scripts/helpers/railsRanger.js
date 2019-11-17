requirejs(['node_modules/rails-ranger']);

const config = {
  axios: {
    baseURL: 'http://localhost:3000/',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
}

export default new RailsRanger(config)