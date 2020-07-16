function captureLoginForm() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const loginForm = {
    email: email,
    password: password,
    remember_me: 1
  }

  postLogin(loginForm);
}


// TODO: refactor this to use the apiService.js
// TODO: refactor to handle auth state and rendering in a better way
function postLogin(form) {
  const request = new XMLHttpRequest();
  request.open('POST', 'https://www.highlighter.online/authenticate');
  request.setRequestHeader('Access-Control-Allow-Origin', '*');
  request.setRequestHeader('Accept', 'application/json');
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({ user: form }));

  request.onload = function() {
    if (request.status === 200) {
      setAuthToken(request.response);
      loginSuccessful();
    } else if (request.status !== 200){
      loginFailure();
    }
  }
}

function setAuthToken(response) {
  const jwtToken = JSON.parse(response);
  localStorage.setItem('highlighterJWT', jwtToken.auth_token);
}

function loginSuccessful(response) {
  render('successful');
  window.setTimeout(window.close, 1000);
}

function loginFailure() {
  document.getElementById('login-form').reset();
  render('error');
}

function redirectToApp() {
  chrome.tabs.create({ url: 'https://www.highlighter.online/users/sign_up' });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('sign-up').addEventListener('click', redirectToApp, false);
  document.getElementById('submit-button').addEventListener('click', captureLoginForm, false);

  if (document.getElementById('login-form')) {
    document.getElementById('login-form').onkeydown = function(e) {
      if (e.keyCode == '13') {
        captureLoginForm();
      }
    }
  }
  
});