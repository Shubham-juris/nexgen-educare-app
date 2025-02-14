// backend/controllers/userController.js
    const bcrypt = require('bcryptjs');
    // const jwt = require('jsonwebtoken');
    const db = require('../models/db');

    // Signup
    const signup = (req, res) => {
    const { fname, lname, email, password } = req.body;
    const Password = bcrypt.hashSync(password, 10);

    const query = 'INSERT INTO users (fname, lname, email, password) VALUES (?, ?, ?)';
    db.query(query, [fname, lname, email, Password], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: 'Error creating user' });

        res.status(200).json({ success: true, message: 'User created successfully' });
    });
    };

//     // Login
//     const login = (req, res) => {
//     const { email, password } = req.body;

//     const query = 'SELECT * FROM users WHERE email = ?';
//     db.query(query, [email], (err, results) => {
//         if (err || results.length === 0) return res.status(401).json({ success: false, message: 'User not found' });

//         const user = results[0];
//         const isPasswordValid = bcrypt.compareSync(password, user.password);

//         if (!isPasswordValid) return res.status(401).json({ success: false, message: 'Invalid credentials' });

//         const token = jwt.sign(
//           { id: user.id, name: user.name, email: user.email }, // Ensure name and email are included
//           process.env.JWT_SECRET,
//           { expiresIn: '1h' }
//         );
//         res.status(200).json({ success: true, token, user: { id: user.id, name: user.name, email: user.email } });
//     });
//     };

//     // Profile
// const profile = (req, res) => {
//   const token = req.headers['authorization'];
//   if (!token) return res.status(403).json({ success: false, message: 'No token provided' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(500).json({ success: false, message: 'Failed to authenticate token' });

//     res.status(200).json({ success: true, user: decoded });
//   });
// };
      
    module.exports = { signup};