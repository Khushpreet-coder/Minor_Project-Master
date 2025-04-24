const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve the client folder (1 level up from backend)
app.use(express.static(path.join(__dirname, '../client')));

// ✅ Serve index.html for /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// ✅ MySQL setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fitness_freak'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

// ✅ Login Route
app.post('/login', (req, res) => {
  const { email, password, role } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ? AND role = ?';

  db.query(sql, [email, password, role], (err, result) => {
    if (err) return res.status(500).send('Database error');
    if (result.length > 0) {
      res.json({ success: true, message: 'Login successful', role });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
