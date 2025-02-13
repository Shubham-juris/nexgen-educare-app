const express = require('express');
const mysql = require('mysql2');

// Create Express app
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'nexgen',
  password: 'Nexgen$2025',
  database: 'admin_nexgen',
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Example API endpoint: Get all users
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: 'Database query failed', error: err });
    }
    res.json(results);
  });
});

// Example API endpoint: Add a new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  db.query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'Failed to insert user', error: err });
      }
      res.status(201).json({ id: results.insertId, name, email });
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
