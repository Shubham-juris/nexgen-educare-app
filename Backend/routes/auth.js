// const express = require('express');
// const router = express.Router();
// const db = require('../config/db');

// let enrollmentCounter = 0; // Counter for generating enrollment IDs

// // Signup route
// router.post('/signup', (req, res) => {
//   const { name, email, phone, password } = req.body;

//   const enrollmentId = `NG251100${enrollmentCounter + 1}`;
//   enrollmentCounter++;

//   const sql = `INSERT INTO signup (name, email, phone, password, enrollmentId) VALUES (?, ?, ?, ?, ?)`;
//   db.query(sql, [name, email, phone, password, enrollmentId], (err) => {
//     if (err) {
//       console.error('Error inserting data:', err);
//       return res.status(500).json({ message: 'Database error.' });
//     }
//     res.status(200).json({ message: 'Signup successful!', enrollmentId });
//   });
// });

// // Login route
// // <<<<<<< Updated upstream
// router.post('/login', (req, res) => {
//   const { enrollmentId, password } = req.body;
//   // =======
//   router.post('/login', (req, res) => {
//     const { student_id, password } = req.body;
//     // >>>>>>> Stashed changes

//     if (!student_id || !password) {
//       return res
//         .status(400)
//         .json({ message: 'Enrollment ID and password are required' });
//     }

//     const sql = `SELECT * FROM registrations WHERE student_id = ? AND password = ?`;
//     db.query(sql, [student_id, password], (err, results) => {
//       if (err) {
//         console.error('Error querying database:', err);
//         return res.status(500).json({ message: 'Database error.' });
//       }

//       if (results.length > 0) {
//         res.status(200).json({ message: 'Login successful', user: results[0] });
//       } else {
//         res.status(401).json({ message: 'Invalid Enrollment ID or password' });
//       }
//     });
//   });
// });

// module.exports = router;
