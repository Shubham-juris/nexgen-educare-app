const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const db = require('../config/db');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Fetch all courses
router.get('/courses', (req, res) => {
  const sql = 'SELECT * FROM courses';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to fetch courses.' });
    }
    res.status(200).json(results);
  });
});

// Add a new course
router.post(
  '/courses',
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]),
  (req, res) => {
    const { name, code } = req.body;
    const file = req.files['file']
      ? `/uploads/${req.files['file'][0].filename}`
      : null;
    const image = req.files['image']
      ? `/uploads/${req.files['image'][0].filename}`
      : null;

    if (!name || !code) {
      return res.status(400).json({ message: 'Name and code are required.' });
    }

    const sql =
      'INSERT INTO courses (name, code, file, image) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, code, file, image], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to add course.' });
      }
      res.status(200).json({ id: results.insertId, name, code, file, image });
    });
  }
);

// Delete a course
router.delete('/courses/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM courses WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to delete course.' });
    }
    res.status(200).json({ message: 'Course deleted successfully.' });
  });
});

app.post('/data', (req, res) => {
  const { name, contactNumber } = req.body;
  const query = 'INSERT INTO user_contact_info (fullName, contactNumber) VALUES (?, ?)';
  db.query(query, [name, contactNumber], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Data saved successfully' });
  });
});

app.get('/data', (req, res) => {
  const query = 'SELECT id, fullName AS name, contactNumber FROM user_contact_info';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});


module.exports = router;
