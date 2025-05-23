const express = require('express');
const mysql   = require('mysql2');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = 5000;

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
db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// ==================== AUTH ====================
app.post('/signup', (req, res) => {
  const { name, age, gender, email, password } = req.body;
  if (!name || !age || !gender || !email || !password) {
    return res.status(400).json({ success:false, message:'Please fill all fields' });
  }
  const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  if (!pwRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message: 'Password must be ≥8 chars, include upper, lower, number & special char'
    });
  }
  db.query('SELECT 1 FROM users WHERE email = ?', [email], (e, results) => {
    if (e) return res.status(500).json({ success:false, message:'Database error' });
    if (results.length) {
      return res.status(409).json({ success:false, message:'Email already registered' });
    }
    db.query(
      'INSERT INTO users (name, age, gender, email, password, role) VALUES (?, ?, ?, ?, ?, "user")',
      [name, age, gender, email, password],
      err2 => {
        if (err2) return res.status(500).json({ success:false, message:'Signup failed' });
        res.status(201).json({ success:true, message:'Signup successful' });
      }
    );
  });
});

app.post('/login', (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ success:false, message:'Missing fields' });
  }
  const table = role === 'admin' ? 'admin' : 'users';
  db.query(`SELECT * FROM ${table} WHERE email = ? AND password = ?`, [email, password], (err, results) => {
    if (err) return res.status(500).json({ success:false, message:'Database error' });
    if (results.length) {
      return res.json({ success:true, message:'Login successful', role });
    }
    res.json({ success:false, message:'Invalid credentials' });
  });
});

// ==================== USERS ====================
app.get('/users', (req, res) => {
  db.query('SELECT id, name, gender, age, email FROM users', (err, results) => {
    if (err) return res.status(500).json({ success:false, message:'Failed to fetch users' });
    res.json({ success:true, users: results });
  });
});

app.delete('/users/:id', (req, res) => {
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ success:false, message:'Database error' });
    if (result.affectedRows) return res.json({ success:true, message:'User deleted' });
    res.status(404).json({ success:false, message:'User not found' });
  });
});

// ==================== WORKOUTS ====================
app.post('/workouts', (req, res) => {
  const { title, details, category } = req.body;
  if (!title || !details || !category) {
    return res.status(400).json({ success:false, message:'Missing fields' });
  }
  db.query('INSERT INTO workouts (title, details, category) VALUES (?, ?, ?)', [title, details, category], err => {
    if (err) return res.status(500).json({ success:false, message:'Failed to add workout' });
    res.status(201).json({ success:true, message:'Workout added successfully' });
  });
});

app.get('/workouts', (req, res) => {
  const { category } = req.query;
  const sql = category ? 'SELECT * FROM workouts WHERE category = ?' : 'SELECT * FROM workouts';
  const params = category ? [category] : [];
  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ success:false, message:'Failed to fetch workouts' });
    res.json({ success:true, workouts: results });
  });
});

app.delete('/workouts/:id', (req, res) => {
  db.query('DELETE FROM workouts WHERE id = ?', [req.params.id], err => {
    if (err) return res.status(500).json({ success:false, message:'Failed to delete workout' });
    res.json({ success:true, message:'Workout deleted successfully' });
  });
});

// ==================== NUTRITION ====================
app.post('/nutrition', (req, res) => {
  const { title, image_url, category, calories } = req.body;
  if (!title || !image_url || !category || !calories) {
    return res.status(400).json({ success:false, message:'Missing fields' });
  }
  const sql = 'INSERT INTO nutrition_plans (title, image_url, category, calories) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, image_url, category, calories], err => {
    if (err) return res.status(500).json({ success:false, message:'Failed to add nutrition plan' });
    res.status(201).json({ success:true, message:'Nutrition plan added successfully' });
  });
});

app.get('/nutrition', (req, res) => {
  db.query('SELECT * FROM nutrition_plans', (err, results) => {
    if (err) return res.status(500).json({ success:false, message:'Failed to fetch nutrition plans' });
    res.json({ success:true, nutrition: results });
  });
});

app.delete('/nutrition/:id', (req, res) => {
  db.query('DELETE FROM nutrition_plans WHERE id = ?', [req.params.id], err => {
    if (err) return res.status(500).json({ success:false, message:'Failed to delete nutrition plan' });
    res.json({ success:true, message:'Nutrition plan deleted successfully' });
  });
});

// ==================== BLOGS ====================
app.post('/blogs', (req, res) => {
  const { title, image_url, description } = req.body;
  if (!title || !image_url || !description) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }
  const sql = 'INSERT INTO blogs (title, image_url, description) VALUES (?, ?, ?)';
  db.query(sql, [title, image_url, description], err => {
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
  db.query('DELETE FROM blogs WHERE id = ?', [req.params.id], err => {
    if (err) return res.status(500).json({ success:false, message:'Failed to delete blog' });
    res.json({ success:true, message:'Blog deleted successfully' });
  });
});

// ==================== SERVER ====================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
