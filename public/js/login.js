const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/users');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  console.log('im here line 27');
  // Stop the browser from submitting the form so we can do so with JavaScript
  // event.preventDefault();

  // Gather the data from the form elements on the page
  const name = document.querySelector('#name-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const city = document.querySelector('#city-signup').value.trim();

  if (name && username && password && email && city) {
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ name, username, password, email, city }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};
if (document.querySelector('#login-form')) {
  document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);
}

console.log("document.querySelector('#signup-form')");

if (document.querySelector('#signup-form')) {
  document
    .querySelector('#signup-form')
    .addEventListener('submit', signupFormHandler);
}
