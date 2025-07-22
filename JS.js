// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

let users = [];

app.use(cors());
app.use(express.json());

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }
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
