const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fitness_freak',
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// ==================== AUTHENTICATION ====================

// ---- Signup (only for users, not admin)
app.post('/signup', (req, res) => {
  const { name, age, gender, email, password } = req.body;

  if (!name || !age || !gender || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please fill all fields' });
  }

  // ✅ Password Strength Check
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',
    });
  }

  db.query('SELECT 1 FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });
    if (results.length) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    const sql = `
      INSERT INTO users (name, age, gender, email, password, role)
      VALUES (?, ?, ?, ?, ?, 'user')
    `;
    db.query(sql, [name, age, gender, email, password], (err2) => {
      if (err2) return res.status(500).json({ success: false, message: 'Signup failed' });
      res.status(201).json({ success: true, message: 'Signup successful' });
    });
  });
});

// ---- Login (for both admin and user)
app.post('/login', (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  const table = role === 'admin' ? 'admin' : 'users';
  const sql = `SELECT * FROM ${table} WHERE email = ? AND password = ?`;

  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });
    if (results.length) {
      return res.json({ success: true, message: 'Login successful', role });
    }
    res.json({ success: false, message: 'Invalid credentials' });
  });
});

// ==================== USERS ====================

// ---- Fetch all users
app.get('/users', (req, res) => {
  db.query('SELECT id, name, gender, age, email FROM users', (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to fetch users' });
    res.json({ success: true, users: results });
  });
});

// ---- Delete a user
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });
    if (result.affectedRows) {
      return res.json({ success: true, message: 'User deleted' });
    }
    res.status(404).json({ success: false, message: 'User not found' });
  });
});

// ==================== WORKOUTS ====================

app.post('/workouts', (req, res) => {
  const { title, details } = req.body;
  if (!title || !details) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }
  const sql = 'INSERT INTO workouts (title, details) VALUES (?, ?)';
  db.query(sql, [title, details], (err) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to add workout' });
    res.status(201).json({ success: true, message: 'Workout added successfully' });
  });
});

app.get('/workouts', (req, res) => {
  db.query('SELECT * FROM workouts', (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to fetch workouts' });
    res.json({ success: true, workouts: results });
  });
});

app.delete('/workouts/:id', (req, res) => {
  const workoutId = req.params.id;
  db.query('DELETE FROM workouts WHERE id = ?', [workoutId], (err) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to delete workout' });
    res.json({ success: true, message: 'Workout deleted successfully' });
  });
});

// ==================== NUTRITION ====================

app.post('/nutrition', (req, res) => {
  const { title, image_url } = req.body;
  if (!title || !image_url) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }
  const sql = 'INSERT INTO nutrition_plans (title, image_url) VALUES (?, ?)';
  db.query(sql, [title, image_url], (err) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to add nutrition plan' });
    res.status(201).json({ success: true, message: 'Nutrition plan added successfully' });
  });
});

app.get('/nutrition', (req, res) => {
  db.query('SELECT * FROM nutrition_plans', (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to fetch nutrition plans' });
    res.json({ success: true, nutrition: results });
  });
});

app.delete('/nutrition/:id', (req, res) => {
  const nutritionId = req.params.id;
  db.query('DELETE FROM nutrition_plans WHERE id = ?', [nutritionId], (err) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to delete nutrition plan' });
    res.json({ success: true, message: 'Nutrition plan deleted successfully' });
  });
});

// ==================== BLOGS ====================

app.post('/blogs', (req, res) => {
  const { title, image_url } = req.body;
  if (!title || !image_url) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }
  const sql = 'INSERT INTO blogs (title, image_url) VALUES (?, ?)';
  db.query(sql, [title, image_url], (err) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to add blog' });
    res.status(201).json({ success: true, message: 'Blog added successfully' });
  });
});

app.get('/blogs', (req, res) => {
  db.query('SELECT * FROM blogs', (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
    res.json({ success: true, blogs: results });
  });
});

app.delete('/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  db.query('DELETE FROM blogs WHERE id = ?', [blogId], (err) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to delete blog' });
    res.json({ success: true, message: 'Blog deleted successfully' });
  });
});

// ==================== SERVER ====================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
