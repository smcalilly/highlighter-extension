document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('submitButton').addEventListener('click', captureLoginForm, false);
}, false);

captureLoginForm = () => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const loginForm = {
    email: email,
    password: password,
    remember_me: 1
  }

  postLogin(loginForm);
}

postLogin = (form) => {
  const request = new XMLHttpRequest();

  request.open('POST', 'http://localhost:3000/authenticate');
  request.setRequestHeader('Access-Control-Allow-Origin', '*');
  request.setRequestHeader('Accept', 'application/json');
  request.setRequestHeader('Content-Type', 'application/json');

  console.log(form);
  request.send(JSON.stringify({user: form}));

  // set the jwt
  request.onreadystatechange = function() {
    if (request.readyState == XMLHttpRequest.DONE) {
      const jwtToken = JSON.parse(request.response)
      localStorage.setItem('jwt', jwtToken.auth_token)
    }
  }
}