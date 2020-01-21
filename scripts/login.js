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
  request.open('POST', 'http://localhost:3000/authenticate');
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

async function fetchLogin(form) {
  const url = 'http://localhost:3000/authenticate';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: form })
  });

  if (response.ok) {
    loginSuccessful(response)
  } else {
    loginFailure();
  }
}

function loginSuccessful(response) {
  const jwtToken = JSON.parse(response);
  localStorage.setItem('highlighterJWT', jwtToken.auth_token);

  // display successful message
  render('authenticated');

  // close the popup
  window.setTimeout(window.close, 1000);
}

function loginFailure() {
  document.getElementById('loginForm').reset();
  render('error');
}

function redirectToApp() {
  chrome.tabs.create({ url: 'https://www.highlighter.online/users/sign_up' });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('submitButton').addEventListener('click', captureLoginForm, false);
  document.getElementById('signUp').addEventListener('click', redirectToApp, false);
});