// ✅ BACKEND_JS.js — NETHYPE Backend with updated log message
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

let users = [];

app.use(cors());
app.use(express.json());

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ name, email, password, favorites: [], history: [] });
  res.status(201).json({ message: 'Registered successfully' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  res.json(user);
});

app.listen(PORT, () => {
  console.log(`NETHYPE backend running at http://localhost:${PORT}`);
});


// ✅ JavaScript: Login/Register Form Logic (merge with frontend JS)
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

// ✅ Initialization for default auth toggle on load
window.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('nethypeUser'));
  toggleMainApp(!!user);
});
