captureLoginForm = () => {
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

  request.send(JSON.stringify({user: form}));

  // set the jwt
  request.onreadystatechange = function() {
    if (request.readyState == XMLHttpRequest.DONE) {
      const jwtToken = JSON.parse(request.response)
      localStorage.setItem('jwt', jwtToken.auth_token)
    } else {
      // form validation
    }
  }
}

routeToEmailForm = () => {
  const div = document.getElementsByClassName('app');
  loadHighlightScreen(div);
}

// listen for the login html to load to the popup's dom
const targetNode = document.getElementsByClassName('app');
const config = { childList: true };
const callback = function(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      document.getElementById('submitButton').addEventListener('click', captureLoginForm, false);
      document.getElementById('emailForm').addEventListener('click', routeToEmailForm, false);
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(targetNode[0], config);