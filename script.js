// script.js

function toggleAuthForm(type) {
  document.getElementById('login-form').classList.remove('active');
  document.getElementById('register-form').classList.remove('active');
  document.getElementById(`${type}-form`).classList.add('active');
}

function loginUser() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(user => {
      if (user && user.email) {
        localStorage.setItem('nethypeUser', JSON.stringify(user));
        alert('Login successful!');
        toggleMainApp(true);
      } else {
        alert(user.message || 'Login failed');
      }
    })
    .catch(err => alert('Error: ' + err));
}

function registerUser() {
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'Registered successfully') {
        alert('Registered successfully! Please login.');
        toggleAuthForm('login');
      } else {
        alert(data.message);
      }
    })
    .catch(err => alert('Error: ' + err));
}

function logoutUser() {
  localStorage.removeItem('nethypeUser');
  toggleMainApp(false);
}

function toggleMainApp(showApp) {
  document.getElementById('login-form').style.display = showApp ? 'none' : 'block';
  document.getElementById('register-form').style.display = showApp ? 'none' : 'block';
  document.getElementById('auth-toggle').style.display = showApp ? 'none' : 'flex';
  document.getElementById('logout-button').style.display = showApp ? 'block' : 'none';
  document.getElementById('recommended-movies').style.display = showApp ? 'grid' : 'none';
}

window.addEventListener('DOMContentLoaded', () => {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('nethypeUser'));
  } catch {
    user = null;
  }
  toggleMainApp(!!user);
});
