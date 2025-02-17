const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const promisePool = pool.promise();
pool.getConnection((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1);
  } else {
    console.log('Connected to the database');
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' });
  }

  try {
    const query = 'SELECT * FROM admins WHERE username = ? AND password = ?';
    const [results] = await promisePool.query(query, [username, password]);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      user: { id: results[0].id, username: results[0].username },
    });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Admin Registration API (No password hashing)
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' });
  }

  try {
    // Check if username already exists
    const checkQuery = 'SELECT * FROM admins WHERE username = ?';
    const [checkResults] = await promisePool.query(checkQuery, [username]);

    if (checkResults.length > 0) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Insert new admin
    const insertQuery = 'INSERT INTO admins (username, password) VALUES (?, ?)';
    const [insertResults] = await promisePool.query(insertQuery, [
      username,
      password,
    ]);

    res.status(201).json({
      message: 'Admin registered successfully',
      user: { id: insertResults.insertId, username },
    });
  } catch (err) {
    console.error('Error during registration:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});
///////////////// Courses /////////////////////////////


// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure 'uploads/' directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Fetch all courses
app.get("/api/courses", (req, res) => {
  const sql = "SELECT * FROM courses";
  pool.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch courses." });
    }
    // Modify file paths to include full URL
    const courses = results.map((course) => ({
      ...course,
      image: course.image ? `http://localhost:3000/uploads/${course.image}` : null,
      file: course.file ? `http://localhost:3000/uploads/${course.file}` : null,
    }));
    res.status(200).json(courses);
  });
});

// Add a new course
app.post(
  "/api/courses",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  (req, res) => {
    const { name, code, price } = req.body;
    const file = req.files["file"] ? req.files["file"][0].filename : null;
    const image = req.files["image"] ? req.files["image"][0].filename : null;

    if (!name || !code || !price) {
      return res.status(400).json({ message: "Name, code, and price are required." });
    }

    const sql =
      "INSERT INTO courses (name, code, price, file, image) VALUES (?, ?, ?, ?, ?)";
    pool.query(sql, [name, code, price, file, image], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to add course." });
      }
      res.status(200).json({ id: results.insertId, name, code, price, file, image });
    });
  }
);

// Delete a course
app.delete("/api/courses/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM courses WHERE id = ?";
  pool.query(sql, [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to delete course." });
    }
    res.status(200).json({ message: "Course deleted successfully." });
  });
});

///////////////// Registration Form /////////////////////////////

// // Save Registration Data API
// app.post('/save-registration', async (req, res) => {
//   const formData = req.body;
//   console.log('Received registration data:', formData);

//   try {
//     const query = `INSERT INTO registrations
//       (firstName, motherName, fatherName, dob, gender, contactNumber, email, address, sameAsCurrentAddress, permanentAddress, courses, preferredTiming, reason, paymentMethod, transactionId, declaration, student_id, password)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
//     const values = [
//       formData.firstName,
//       formData.motherName,
//       formData.fatherName,
//       formData.dob,
//       formData.gender,
//       formData.contactNumber,
//       formData.email,
//       formData.address,
//       formData.sameAsCurrentAddress,
//       formData.permanentAddress,
//       JSON.stringify(formData.courses),
//       formData.preferredTiming,
//       formData.reason,
//       formData.paymentMethod,
//       formData.transactionId,
//       formData.declaration ? 1 : 0,
//       formData.student_id,
//       formData.password,
//     ];

//     const [result] = await promisePool.query(query, values);

//     res.status(201).json({
//       message: 'Registration data saved successfully',
//       registrationId: result.insertId,
//     });
//   } catch (err) {
//     console.error('SQL Error:', err.message);
//     res.status(500).json({ message: 'Database error', error: err.message });
//   }
// });

// // Get Latest Student ID API
// app.get('/get-latest-student-id', async (req, res) => {
//   try {
//     const query = `SELECT student_id FROM registrations ORDER BY id DESC LIMIT 1`;
//     const [result] = await promisePool.query(query);

//     const latestStudentId = result.length > 0 ? result[0].student_id : null;

//     res.status(200).json({ latestStudentId });
//   } catch (err) {
//     console.error('Error fetching latest student ID:', err.message);
//     res.status(500).json({ message: 'Failed to fetch latest student ID' });
//   }
// });

// // Get all registration data API
// app.get('/get-registrations', async (req, res) => {
//   try {
//     const query = 'SELECT * FROM registrations';
//     const [registrations] = await promisePool.query(query);
//     const formattedRegistrations = registrations.map(reg => ({
//       ...reg,
//       courses: JSON.stringify(reg.courses),
//       // qualification: JSON.stringify(reg.qualification),
//     }));

//     res.status(200).json({
//       message: 'Registration data fetched successfully',
//       registrations: formattedRegistrations, 
//     });
//   } catch (err) {
//     console.error('Error fetching registration data:', err.message);
//     res.status(500).json({ message: 'Failed to fetch registration data' });
//   }
// });

// app.get('/get-courses', (req, res) => {
//   console.log('Fetching courses...');
//   const query = 'SELECT id, name FROM Courses';

//   pool.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching courses:', err);
//       return res.status(500).json({ message: 'Error fetching courses' });
//     }
//     console.log('Courses fetched:', results);
//     res.json(results);
//   });
// });

// app.get('/get-courses', (req, res) => {
//   console.log('Fetching courses...');
//   const query = 'SELECT id, name, price FROM Courses'; // Add price column

//   pool.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching courses:', err);
//       return res.status(500).json({ message: 'Error fetching courses' });
//     }
//     console.log('Courses fetched:', results);
//     res.json(results);
//   });
// });



// Backend: save-registration route
app.post('/api/register-student', async (req, res) => {
  const {
    studentName, fatherName, motherName, dateOfBirth, gender, phoneNumber, emailAddress, address,
    sameAsPermanentAddress, permanentAddress, courses, preferredTiming, reason,
    highSchool, intermediate, bachelorDegree, masterDegree, additionalCertifications
  } = req.body;

  if (!studentName || !fatherName || !motherName || !dateOfBirth || !gender || !phoneNumber || !emailAddress || !address) {
    return res.status(400).json({ message: 'All required fields must be filled' });
  }

  try {
    const query = `
      INSERT INTO students_data (
        studentName, fatherName, motherName, dateOfBirth, gender, phoneNumber, emailAddress, address, sameAsPermanentAddress, permanentAddress,
        highSchoolInstitute, highSchoolBoard, highSchoolYear, highSchoolPercentage,
        intermediateInstitute, intermediateBoard, intermediateYear, intermediatePercentage,
        bachelorInstitute, bachelorBoard, bachelorYear, bachelorPercentage,
        masterInstitute, masterBoard, masterYear, masterPercentage,
        additionalCertifications, courses, preferredTiming, reason
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                ?, ?, ?, ?,
                ?, ?, ?, ?,
                ?, ?, ?, ?,
                ?, ?, ?, ?,
                ?, ?, ?, ?)`; // ✅ Added courses, preferredTiming, and reason
    
    const values = [
      studentName, fatherName, motherName, dateOfBirth, gender, phoneNumber, emailAddress, address, sameAsPermanentAddress, permanentAddress,
      highSchool?.instituteName || null, highSchool?.boardUniversity || null, highSchool?.yearOfPassing || null, highSchool?.percentageGrade || null,
      intermediate?.instituteName || null, intermediate?.boardUniversity || null, intermediate?.yearOfPassing || null, intermediate?.percentageGrade || null,
      bachelorDegree?.instituteName || null, bachelorDegree?.boardUniversity || null, bachelorDegree?.yearOfPassing || null, bachelorDegree?.percentageGrade || null,
      masterDegree?.instituteName || null, masterDegree?.boardUniversity || null, masterDegree?.yearOfPassing || null, masterDegree?.percentageGrade || null,
      additionalCertifications || null,
      JSON.stringify(courses), // ✅ Convert courses array to a comma-separated string
      preferredTiming ,
      reason
    ];

    const [result] = await promisePool.query(query, values);

    res.status(201).json({
      message: 'Registration data saved successfully',
      registrationId: result.insertId,
    });
  } catch (err) {
    console.error('SQL Error:', err.message);
    res.status(500).json({ message: 'Database error', error: err.message });
  }
});

// Get Latest Student ID API
app.get('/get-latest-student-id', async (req, res) => {
  try {
    const query = `SELECT student_id FROM registrations ORDER BY id DESC LIMIT 1`;
    const [result] = await promisePool.query(query);

    const latestStudentId = result.length > 0 ? result[0].student_id : null;

    res.status(200).json({ latestStudentId });
  } catch (err) {
    console.error('Error fetching latest student ID:', err.message);
    res.status(500).json({ message: 'Failed to fetch latest student ID' });
  }
});

// Get all registration data API
app.get('/get-registrations', async (req, res) => {
  try {
    const query = 'SELECT * FROM students_data';
    const [registrations] = await promisePool.query(query);
    const formattedRegistrations = registrations.map(reg => ({
      ...reg,
      courses: JSON.stringify(reg.courses),
      // qualification: JSON.stringify(reg.qualification),
    }));

    res.status(200).json({
      message: 'Registration data fetched successfully',
      registrations: formattedRegistrations, 
    });
  } catch (err) {
    console.error('Error fetching registration data:', err.message);
    res.status(500).json({ message: 'Failed to fetch registration data' });
  }
});


app.get('/get-courses', (req, res) => {
  console.log('Fetching courses...');
  const query = 'SELECT id, name FROM Courses';

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching courses:', err);
      return res.status(500).json({ message: 'Error fetching courses' });
    }
    console.log('Courses fetched:', results);
    res.json(results);
  });
});



/////////////////////////////////////////////////

app.get('/get-students', (req, res) => {
  console.log('Fetching students...');
  const query = 'SELECT * FROM registrations';
  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ message: 'Error fetching data' });
      return;
    }
    console.log('Students fetched:', results);
    res.json(results);
  });
});
/////////////////////////////////////////////////
// //////////////////////***  Teachers   ***///////////////////////////

// Add Teacher API
app.post("/add-teacher", (req, res) => {
  const { first_name, last_name, gender, courses } = req.body;

  if (!first_name || !last_name || !gender || !courses) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query =
    "INSERT INTO teachers (first_name, last_name, gender, courses) VALUES (?, ?, ?, ?)";
  pool.query(query, [first_name, last_name, gender, courses], (err, result) => {
    if (err) {
      console.error("Error adding teacher:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(201).json({ message: "Teacher added successfully", id: result.insertId });
  });
});

// Get Teachers API
app.get("/get-teachers", (req, res) => {
  pool.query("SELECT * FROM teachers", (err, results) => {
    if (err) {
      console.error("Error fetching teachers:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});

// Get Courses API
app.get("/get-courses", (req, res) => {
  pool.query("SELECT * FROM courses", (err, results) => {
    if (err) {
      console.error("Error fetching courses:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});


//  Update teacher details
app.put("/update-teacher/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, gender, courses } = req.body;

  if (!first_name || !last_name || !gender || !courses) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "UPDATE teachers SET first_name = ?, last_name = ?, gender = ?, courses = ? WHERE id = ?";
  pool.query(sql, [first_name, last_name, gender, courses, id], (err, result) => {
    if (err) {
      console.error("Error updating teacher:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.json({ message: "Teacher updated successfully" });
  });
});

// Delete Teacher API
app.delete("/delete-teacher/:id", (req, res) => {
  const { id } = req.params;
  pool.query("DELETE FROM teachers WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting teacher:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Teacher deleted successfully" });
  });
});


/////////////////////////////////////////////////

// Test Route
app.get('/', (req, res) => {
  res.send('API is running on port ' + PORT);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
