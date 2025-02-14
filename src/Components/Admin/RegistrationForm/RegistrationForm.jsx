import React, { useState } from 'react';
import { Container, Paper, Typography, Box, Button } from '@mui/material';
import PersonalInformation from './PersonalInformation';
import EducationalBackground from './EducationalBackground';
import ListOfCourses from './ListOfCourses'; // ✅ Import this

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    gender: '',
    emailAddress: '',
    phoneNumber: '',
    address: '',
    sameAsPermanentAddress: false,
    permanentAddress: '',
    courses: [], // ✅ Make sure this is an array
    preferredTiming: '',
    reason: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setFormData((prevData) => {
      let updatedData = { ...prevData };
  
      // ✅ Address ko handle karna (sameAsPermanentAddress)
      if (name === "sameAsPermanentAddress") {
        updatedData.permanentAddress = checked ? prevData.address : "";
      }
  
      // ✅ Courses ko array me add/remove karna
      if (name === "courses") {
        updatedData.courses = checked
          ? [...prevData.courses, value]  // Add course if checked
          : prevData.courses.filter((course) => course !== value); // Remove if unchecked
      } else {
        // ✅ Nested field handling (education details jaise: highSchool.instituteName)
        const keys = name.split(".");
        if (keys.length > 1) {
          const level = keys[0];  // e.g., "highSchool"
          const field = keys[1];  // e.g., "instituteName"
  
          if (field === "completed") {
            updatedData[level] = checked
              ? { ...prevData[level], completed: true }
              : { completed: false, instituteName: "", boardUniversity: "", yearOfPassing: "", percentageGrade: "" };
          } else {
            updatedData[level] = {
              ...prevData[level],
              [field]: value,
            };
          }
        } else {
          updatedData[name] = type === "checkbox" ? checked : value;
        }
      }
  
      return updatedData;
    });
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/register-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        alert('Registration successful!');
        console.log('Student ID:', result.studentId);
      } else {
        alert('Registration failed: ' + result.message);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography component="h1" variant="h5" align="center">
          Registration Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <PersonalInformation formData={formData} handleChange={handleChange} />
          <EducationalBackground formData={formData} handleChange={handleChange} />
          <ListOfCourses formData={formData} handleChange={handleChange} /> {/* ✅ Add Courses Section */}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegistrationForm;
