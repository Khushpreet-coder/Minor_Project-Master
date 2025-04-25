
// const express = require('express');
// const mysql   = require('mysql2');
// const cors    = require('cors');
// const path    = require('path');

// const app  = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());
// app.use(express.static(path.join(__dirname, '../client')));

// // MySQL
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'fitness_freak'
// });
// db.connect(err => { if (err) throw err; console.log('✅ Connected to MySQL'); });

// // ===== SIGNUP ROUTE =====
// app.post('/signup', (req, res) => {
//   const { name, age, gender, email, password } = req.body;
//   if (!name||!age||!gender||!email||!password) {
//     return res.status(400).json({ success:false, message:'Fill all fields' });
//   }

//   db.query('SELECT 1 FROM users WHERE email = ?', [email], (e, results) => {
//     if (e) return res.status(500).json({ success:false, message:'DB error' });
//     if (results.length) {
//       return res.status(409).json({ success:false, message:'Email already registered' });
//     }
//     const sql = `
//       INSERT INTO users (name, age, gender, email, password, role)
//       VALUES (?, ?, ?, ?, ?, 'user')
//     `;
//     db.query(sql, [name, age, gender, email, password], err2 => {
//       if (err2) return res.status(500).json({ success:false, message:'Signup failed' });
//       res.status(201).json({ success:true, message:'Signup successful' });
//     });
//   });
// });

// // ===== LOGIN ROUTE =====
// app.post('/login', (req, res) => {
//   const { email, password, role } = req.body;
//   if (!email||!password||!role) {
//     return res.status(400).json({ success:false, message:'Missing fields' });
//   }

//   const table = role === 'admin' ? 'admin' : 'users';
//   const sql   = `SELECT 1 FROM ${table} WHERE email = ? AND password = ?`;
//   db.query(sql, [email, password], (e, results) => {
//     if (e) return res.status(500).json({ success:false, message:'DB error' });
//     if (results.length) {
//       return res.json({ success:true, message:'Login successful', role });
//     }
//     res.json({ success:false, message:'Invalid credentials' });
//   });
// });


// // Fetch all users for Admin dashboard
// app.get('/users', (req, res) => {
//   const sql = 'SELECT id, name, gender, age, email FROM users';
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error fetching users:", err);
//       return res.status(500).json({ success: false, message: 'Failed to fetch users' });
//     }
//     res.json({ success: true, users: results });
//   });
// });



// // serve index.html
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/index.html'));
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });
const express = require('express');
const mysql   = require('mysql2');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// MySQL connection
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

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// ====================== SIGNUP ROUTE ======================
app.post('/signup', (req, res) => {
  const { name, age, gender, email, password } = req.body;
  if (!name || !age || !gender || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please fill all fields' });
  }
  db.query('SELECT 1 FROM users WHERE email = ?', [email], (e, results) => {
    if (e) return res.status(500).json({ success: false, message: 'DB error' });
    if (results.length) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }
    const sql = `
      INSERT INTO users (name, age, gender, email, password, role)
      VALUES (?, ?, ?, ?, ?, 'user')
    `;
    db.query(sql, [name, age, gender, email, password], err2 => {
      if (err2) return res.status(500).json({ success: false, message: 'Signup failed' });
      res.status(201).json({ success: true, message: 'Signup successful' });
    });
  });
});

// ====================== LOGIN ROUTE ======================
app.post('/login', (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }
  const table = role === 'admin' ? 'admin' : 'users';
  const sql   = `SELECT * FROM ${table} WHERE email = ? AND password = ?`;
  db.query(sql, [email, password], (e, results) => {
    if (e) return res.status(500).json({ success: false, message: 'DB error' });
    if (results.length) {
      return res.json({ success: true, message: 'Login successful', role });
    }
    res.json({ success: false, message: 'Invalid credentials' });
  });
});

// ====================== GET ALL USERS ======================
app.get('/users', (req, res) => {
  db.query('SELECT id, name, gender, age, email FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch users' });
    }
    res.json({ success: true, users: results });
  });
});

// ====================== DELETE A USER ======================
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    if (result.affectedRows) {
      return res.json({ success: true, message: 'User deleted' });
    }
    res.status(404).json({ success: false, message: 'User not found' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
