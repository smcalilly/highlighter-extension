PAGES = {};
PAGES.login = {};
PAGES.login.page = document.querySelector("#login");

PAGES.user = {};
PAGES.user.page = document.querySelector("#user");
// PAGES.success.message = document.querySelector("#success-message");

PAGES.error = {};
PAGES.error.page = document.querySelector("#error");
//PAGES.error.message = document.querySelector("#error-message");

//PAGES.notFound = {};
//PAGES.notFound.page = document.querySelector("#notFound");
//PAGES.notFound.error = document.querySelector("#notFound-error");

pageFunctions = {};

const token = localStorage.getItem('highlighterJWT');

// pageFunctions.error = function() {

//   PAGES.error.innerHTML = `User not found!`;
// }

function navigate(state = 'login') {
  let currentPage = '';

  if (state === 'error') {
    currentPage = 'error'
  } else if (state === 'login') {
    console.log('token null')
    currentPage = 'login';
  } else if (state === 'authenticated') {
    currentPage = 'user'
  } else {
    currentPage = 'notFound';
  }

  for (let page in PAGES) {
    if (PAGES.hasOwnProperty(page)) {
			console.log('PAGES[page]', PAGES[page])
      PAGES[page].page.classList.remove("active");
    }
  }

  console.log('current page', currentPage);
  console.log('PAGES', PAGES);
  console.log('PAGES[currentPage]', PAGES[currentPage]);

  PAGES[currentPage].page.classList.add('active');
  
  // if (pageFunctions.hasOwnProperty(currentPage)) {
  //   pageFunctions[currentPage]();
  // }
}

document.addEventListener('DOMContentLoaded', function() {
  navigate();
});
