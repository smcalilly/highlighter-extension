function captureLoginForm() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email.length === 0 || password.length === 0) {
    loginFailure();
    return;
  }

  const loginForm = {
    email: email,
    password: password,
    remember_me: 1
  }

  postLogin(loginForm);
}

function postLogin(form) {
  const request = new XMLHttpRequest();
  request.open('POST', 'https://www.highlighter.online/authenticate');
  request.setRequestHeader('Access-Control-Allow-Origin', '*');
  request.setRequestHeader('Accept', 'application/json');
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({ user: form }));

  request.onload = function() {
    if (request.status === 200) {
      loginSuccessful(request.response)
    } else if (request.status !== 200){
      loginFailure();
    }
  }
}

function loginSuccessful(response) {
  const jwtToken = JSON.parse(response);
  localStorage.setItem('highlighterJWT', jwtToken.auth_token);

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
  document.getElementById('submit-button').addEventListener('click', captureLoginForm, false);
  document.getElementById('sign-up').addEventListener('click', redirectToApp, false);
});