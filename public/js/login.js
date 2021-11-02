const loginFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  const warning = document.querySelector('#login_warning');

  if (email && password) {
    // Send the e-mail and password to the server
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      //show a warning message
      const {message} = await response.json();
      warning.textContent = message;
      warning.classList.remove("is-hidden");
    }
  } else {
    warning.textContent = `You need to type in your email address and password to log in.`;
    warning.classList.remove("is-hidden");
  }
};

const signupFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const warning = document.querySelector('#signup_warning');

  
  // Make sure that input is valid
  if (!(name && email && password)) {
    warning.textContent = `You need to type in your name, email address, and password to log in.`;
    warning.classList.remove("is-hidden");
    return;
  }
  if (password.length < 8) {
    warning.textContent = `Your password must be at least eight characters long.`;
    warning.classList.remove("is-hidden");
    return;
  }

  // Send the name, email, and password to the server
  const response = await fetch('/api/users/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    //show a warning message
    const {message} = await response.json();
    warning.textContent = message;
    warning.classList.remove("is-hidden");
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);