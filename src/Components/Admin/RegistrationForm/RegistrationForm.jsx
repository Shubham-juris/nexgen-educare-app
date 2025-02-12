import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@mui/material";


const RegistrationForm = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    fatherName: "",
    motherName:"",
    dob: "",
    gender: "",
    contactNumber: "",
    email: "",
    address: "",
    sameAsCurrentAddress: false,
    permanentAddress: "",
    courses: [],
    preferredTiming: "",
    reason: "",
    paymentMethod: "",
    transactionId: "",
    declaration: false,
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setFormData((prevFormData) => {
      if (type === "checkbox") {
        if (name === "courses") {
          return {
            ...prevFormData,
            courses: checked
              ? [...prevFormData.courses, value]
              : prevFormData.courses.filter((course) => course !== value),
          };
        } else if (name === "sameAsCurrentAddress") {
          return {
            ...prevFormData,
            sameAsCurrentAddress: checked,
            permanentAddress: checked ? prevFormData.address : "",
          };
        } else {
          return { ...prevFormData, [name]: checked };
        }
      } else {
        return { ...prevFormData, [name]: value };
      }
    });
  };
  


  const generateStudentId = async () => {
    const year = new Date().getFullYear();
    const prefix = `NG${year}020`;
    try {
      const response = await axios.get('http://localhost:3000/get-latest-student-id');
      const latestStudentId = response.data.latestStudentId || '200000';
      const counter = parseInt(latestStudentId.slice(-6)) + 1;
      const formattedCounter = counter.toString().padStart(6, '0');
      return `${prefix}${formattedCounter}`;
    } catch (error) {
      console.error('Error fetching latest student ID:', error);
      return `${prefix}00001`;
    }
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };


         

  // Fetch courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-courses");
        setCourses(response.data); // Assuming response.data is an array of courses
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);





  const isFormCompleted = () => {
    const transactionIdValid = 
      formData.paymentMethod === "Cash" || formData.transactionId;
    
    return (
      formData.firstName &&
      formData.fatherName &&
      formData.motherName &&
      formData.dob &&
      formData.gender &&
      formData.contactNumber &&
      formData.email &&
      formData.address &&
      formData.courses.length > 0 &&
      formData.preferredTiming &&
      formData.reason &&
      formData.paymentMethod &&
      transactionIdValid && 
      formData.declaration
    );
  };
  

  const handleSubmit = async () => {
    const studentId = await generateStudentId();
    const password = generatePassword();
    const dataToSubmit = { ...formData, student_id: studentId, password };

    if (!formData.paymentMethod || formData.paymentMethod === "Cash") {
      delete dataToSubmit.transactionId;
    }

    try {
      const response = await axios.post('http://localhost:3000/save-registration', dataToSubmit);
      alert(`Registration Successful!\nStudent ID: ${studentId}\nPassword: ${password}`);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  return (
    <Container>
      <Box sx={{ width: "80%", margin: "auto", mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Registration Form</Typography>

      <Typography variant="h6">Personal Information</Typography>
      <TextField
        fullWidth
        label="First Name"
        margin="normal"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      
      <TextField
        fullWidth
        label="Father Name"
        margin="normal"
        name="fatherName"
        value={formData.fatherName}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Mother Name"
        margin="normal"
        name="motherName"
        value={formData.motherName }
        onChange={handleChange}
      />
      <TextField
        fullWidth
        type="date"
        label="Date of Birth"
        margin="normal"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />
      <Typography variant="body1" sx={{ mt: 2 }}>Gender</Typography>
      <RadioGroup
        row
        name="gender"
        value={formData.gender}
        onChange={handleChange}
      >
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
      <TextField
        fullWidth
        label="Contact Number"
        margin="normal"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Email Address"
        margin="normal"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
          fullWidth
          label="Address"
          margin="normal"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      <FormControlLabel
          control={
            <Checkbox
              name="sameAsCurrentAddress"
              checked={formData.sameAsCurrentAddress}
              onChange={handleChange}
            />
          }
          label="Same as Current Address"
      />
      <TextField
        fullWidth
        label="Permanent Address"
        margin="normal"
        name="permanentAddress"
        value={formData.permanentAddress}
        onChange={handleChange}
        disabled={formData.sameAsCurrentAddress}
      />
      

      <Typography variant="h6" sx={{ mt: 4 }}>Course Information</Typography>      
      <Container>
      <Box>
        <Typography variant="h6">Courses</Typography>
        {courses.map((course) => (
          <FormControlLabel
            key={course.id}
            control={
              <Checkbox
                name="courses"
                value={course.name}
                checked={formData.courses.includes(course.name)}
                onChange={handleChange}
              />
            }
            label={course.name}
          />
        ))}
      </Box>
    </Container>


      <Typography variant="body1" sx={{ mt: 2 }}>Preferred Batch Timing</Typography>
      <RadioGroup
        row
        name="preferredTiming"
        value={formData.preferredTiming}
        onChange={handleChange}
      >
        <FormControlLabel value="morning" control={<Radio />} label="Morning" />
        <FormControlLabel value="afternoon" control={<Radio />} label="Afternoon" />
        <FormControlLabel value="evening" control={<Radio />} label="Evening" />
      </RadioGroup>
      <TextField
        fullWidth
        label="Reason for Choosing this Course"
        margin="normal"
        multiline
        rows={4}
        name="reason"
        value={formData.reason}
        onChange={handleChange}
        inputProps={{ maxLength: 200 }}
      />

      <Typography variant="h6" sx={{ mt: 4 }}>Educational Background</Typography>

      <Typography variant="h6" sx={{ mt: 4 }}>Payment Information</Typography>
      <RadioGroup
        row
        name="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleChange}
      >
         <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
          <FormControlLabel value="Bank Transfer" control={<Radio />} label="Bank Transfer" />
          <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
          <FormControlLabel value="Card" control={<Radio />} label="Card" />
        </RadioGroup>
      
        {formData.paymentMethod !== "Cash" && (
          <TextField
            fullWidth
            label="Transaction ID (if applicable)"
            margin="normal"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
          />
        )}
      <Box sx={{ mt: 4 }}>
        <FormControlLabel
          control={
            <Checkbox
              name="declaration"
              checked={formData.declaration}
              onChange={handleChange}
            />
          }
          label="I hereby declare that the information provided is correct."
        />
      </Box>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!isFormCompleted()}
        >
          Submit
        </Button>
      </Box>
    </Box>
    </Container>
  );
};

export default RegistrationForm;
