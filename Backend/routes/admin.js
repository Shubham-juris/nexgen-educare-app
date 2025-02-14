const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();
const SECRET_KEY = 'your_secret_key'; // Replace with a strong secret key

// Admin Login Route
router.post('/login', async (req, res) => {
  const { admin, password } = req.body;

  try {
    // Query the admin by admin_id
    const [rows] = await db.execute('SELECT * FROM admins WHERE admin_id = ?', [
      admin,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const adminData = rows[0];

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, adminData.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: adminData.id }, SECRET_KEY, {
      expiresIn: '1h',
    });

    res.status(200).json({
      message: 'Login successful',
      user: { adminId: adminData.admin_id },
      token,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res
      .status(500)
      .json({ message: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
