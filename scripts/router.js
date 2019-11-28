const loadLoginScreen = (div) => {
  // const scriptTag = document.createElement('script');
  // scriptTag.src = '/scripts/login.js';
  // document.head.appendChild(scriptTag);

  $(div).load('login.html');
}

const loadHighlightScreen = (div) => {
  const scriptTag = document.createElement('script');
  scriptTag.src = '/scripts/emailHighlights.js';
  document.head.appendChild(scriptTag);
  
  $(div).load('emailHighlights.html');
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('dom loaded');
  const div = document.getElementsByClassName('app');
  const token = localStorage.getItem('jwt');

  if (token === null) {
    loadLoginScreen(div);
  } else {
    loadHighlightScreen(div);
  }
}, false);

document.addEventListener('storage', function(e) {
  console.log(`Key Changed: ${e.key}`);
  console.log(`New Value: ${e.newValue}`);
});