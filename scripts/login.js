loginFailure = () => {
  document.getElementById('loginForm').reset();
  navigate('error');
}

captureLoginForm = () => {
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

  try {
    postLogin(loginForm);
  } catch {
    loginFailure();
  }
}

postLogin = async (form) => {
  const request = new XMLHttpRequest();

  request.open('POST', 'https://www.highlighter.online/authenticate');
  request.setRequestHeader('Access-Control-Allow-Origin', '*');
  request.setRequestHeader('Accept', 'application/json');
  request.setRequestHeader('Content-Type', 'application/json');

  request.send(JSON.stringify({user: form}));

  request.onreadystatechange = function() {
    if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
      const jwtToken = JSON.parse(request.response);
      localStorage.setItem('highlighterJWT', jwtToken.auth_token);

      //oginSuccessNotification();
      navigate('authenticated');
      window.setTimeout(window.close, 1000)
      //window.close();
      //successNotification();
    } else if (request.status !== 200){
      loginFailure();
    }
  }
}

function loginSuccessNotification() {
  const options = {
    type: "basic",
    iconUrl: "images/yellow-box.png",
    title: "Log in successful!",
    message: "Keeping on reading.",
  }

  chrome.notifications.create(options);
}

function redirectToApp() {
  chrome.tabs.create({ url: 'https://www.highlighter.online/users/sign_up' });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('submitButton').addEventListener('click', captureLoginForm, false);
  document.getElementById('signUp').addEventListener('click', redirectToApp, false);
});