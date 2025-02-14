import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
  const [formData, setFormData] = useState({
    firstName: "",
    fatherName: "",
    motherName:"",
    dob: "",
    gender: "",
    contactNumber: "",
    email: "",
    address: "",
    courses: [],
    preferredTiming: "",
    reason: "",
    qualification: "",
    institution: "",
    graduationYear: "",
    experience: "",
    relevantExperience: "",
    paymentOption: "",
    paymentMethod: "",
    transactionId: "",
    declaration: false,
  });

  // useEffect(() => {
  //   fetchStudents();
  // }, []);

  // const fetchStudents = () => {
  //   axios
  //     .get("http://localhost:3000/get-students")
  //     .then((response) => {
  //       setStudents(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching students:", error);
  //     });
  // };
  

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && Array.isArray(formData[name])) {
      setFormData({
        ...formData,
        [name]: checked
          ? [...formData[name], value]
          : formData[name].filter((item) => item !== value),
      });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };



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
      formData.qualification.length > 0 &&
      formData.institution &&
      (formData.experience === "no" || formData.relevantExperience) &&
      formData.paymentOption &&
      formData.paymentMethod &&
      transactionIdValid &&  // Make sure transactionId is valid when needed
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

      <Typography variant="h6" sx={{ mt: 4 }}>Course Information</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>Courses</Typography>
      
      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Cooking Course"
            checked={formData.courses.includes("Cooking Course")}
            onChange={handleChange}
          />
        }
        label="Cooking Course"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Nanny Course"
            checked={formData.courses.includes("Nanny Course")}
            onChange={handleChange}
          />
        }
        label="Nanny Course"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Legal Drafting"
            checked={formData.courses.includes("Legal Drafting")}
            onChange={handleChange}
          />
        }
        label="Legal Drafting"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Security Training"
            checked={formData.courses.includes("Security Training")}
            onChange={handleChange}
          />
        }
        label="Security Training"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Video Editing"
            checked={formData.courses.includes("Video Editing")}
            onChange={handleChange}
          />
        }
        label="Video Editing"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Call Center Dispatch"
            checked={formData.courses.includes("Call Center Dispatch")}
            onChange={handleChange}
          />
        }
        label="Call Center Dispatch"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Dental Receptionist"
            checked={formData.courses.includes("Dental Receptionist")}
            onChange={handleChange}
          />
        }
        label="Dental Receptionist"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Sales Training"
            checked={formData.courses.includes("Sales Training")}
            onChange={handleChange}
          />
        }
        label="Sales Training"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Food Handler"
            checked={formData.courses.includes("Food Handler")}
            onChange={handleChange}
          />
        }
        label="Food Handler"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Event Planning"
            checked={formData.courses.includes("Event Planning")}
            onChange={handleChange}
          />
        }
        label="Event Planning"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Translator Course"
            checked={formData.courses.includes("Translator Course")}
            onChange={handleChange}
          />
        }
        label="Translator Course"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="IELTS Preparation"
            checked={formData.courses.includes("IELTS Preparation")}
            onChange={handleChange}
          />
        }
        label="IELTS Preparation"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Busy Software"
            checked={formData.courses.includes("Busy Software")}
            onChange={handleChange}
          />
        }
        label="Busy Software"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Content Writing"
            checked={formData.courses.includes("Content Writing")}
            onChange={handleChange}
          />
        }
        label="Content Writing"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Makeup Course"
            checked={formData.courses.includes("Makeup Course")}
            onChange={handleChange}
          />
        }
        label="Makeup Course"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="SEO Management"
            checked={formData.courses.includes("SEO Management")}
            onChange={handleChange}
          />
        }
        label="SEO Management"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Tally Prime"
            checked={formData.courses.includes("Tally Prime")}
            onChange={handleChange}
          />
        }
        label="Tally Prime"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Web Designing"
            checked={formData.courses.includes("Web Designing")}
            onChange={handleChange}
          />
        }
        label="Web Designing"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="QuickBooks"
            checked={formData.courses.includes("QuickBooks")}
            onChange={handleChange}
          />
        }
        label="QuickBooks"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Digital Marketing"
            checked={formData.courses.includes("Digital Marketing")}
            onChange={handleChange}
          />
        }
        label="Digital Marketing"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Hardware and Networking"
            checked={formData.courses.includes("Hardware and Networking")}
            onChange={handleChange}
          />
        }
        label="Hardware and Networking"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Graphic Designing"
            checked={formData.courses.includes("Graphic Designing")}
            onChange={handleChange}
          />
        }
        label="Graphic Designing"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Python Crash Course"
            checked={formData.courses.includes("Python Crash Course")}
            onChange={handleChange}
          />
        }
        label="Python Crash Course"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Nursing Entrance Test Coaching"
            checked={formData.courses.includes("Nursing Entrance Test Coaching")}
            onChange={handleChange}
          />
        }
        label="Nursing Entrance Test Coaching"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Dispatch Course"
            checked={formData.courses.includes("Dispatch Course")}
            onChange={handleChange}
          />
        }
        label="Dispatch Course"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Hospitality Management"
            checked={formData.courses.includes("Hospitality Management")}
            onChange={handleChange}
          />
        }
        label="Hospitality Management"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Real Estate Management"
            checked={formData.courses.includes("Real Estate Management")}
            onChange={handleChange}
          />
        }
        label="Real Estate Management"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Sign Language"
            checked={formData.courses.includes("Sign Language")}
            onChange={handleChange}
          />
        }
        label="Sign Language"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="French Level 2"
            checked={formData.courses.includes("French Level 2")}
            onChange={handleChange}
          />
        }
        label="French Level 2"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="courses"
            value="Full Stack Developers"
            checked={formData.courses.includes("Full Stack Developers")}
            onChange={handleChange}
          />
        }
        label="Full Stack Developers"
      />

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
      <Typography variant="body1" sx={{ mt: 2 }}>Highest Qualification</Typography>
      <RadioGroup
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
        >
          <FormControlLabel value="High School" control={<Radio />} label="High School" />
          <FormControlLabel value="Graduate" control={<Radio />} label="Graduate" />
          <FormControlLabel value="Postgraduate" control={<Radio />} label="Postgraduate" />
        </RadioGroup>
        
        <TextField
          fullWidth
          label="Institution/School Name"
          margin="normal"
          name="institution"
          value={formData.institution}
          onChange={handleChange}
        />
        
        {formData.qualification === "Graduate" && (
          <TextField
            fullWidth
            label="Year of Graduation"
            margin="normal"
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleChange}
          />
        )}
      <Typography variant="body1" sx={{ mt: 2 }}>Experience (If Applicable)</Typography>
      <RadioGroup
        row
        name="experience"
        value={formData.experience}
        onChange={handleChange}
      >
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>
      {formData.experience === "yes" && (
        <TextField
          fullWidth
          label="If yes, please specify"
          margin="normal"
          name="relevantExperience"
          value={formData.relevantExperience}
          onChange={handleChange}
        />
      )}

      <Typography variant="h6" sx={{ mt: 4 }}>Payment Information</Typography>
      <RadioGroup
        row
        name="paymentOption"
        value={formData.paymentOption}
        onChange={handleChange}
      >
        <FormControlLabel value="full" control={<Radio />} label="Full Payment" />
        <FormControlLabel value="installments" control={<Radio />} label="Installments" />
      </RadioGroup>
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



  ////////////////////////////////////////////////////////////////////////////////////


  import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  TextField,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
  RadioGroup,
  Radio,
} from "@mui/material";

const RegistrationForm = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sameAsAddress, setSameAsAddress] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "",
    contactNumber: "",
    email: "",
    address: "",
    permanentAddress: "",
    courses: [],
    preferredTiming: "",
    reason: "",
    qualification: "",
    institution: "",
    graduationYear: "",
    experience: "",
    relevantExperience: "",
    paymentOption: "",
    paymentMethod: "",
    transactionId: "",
    declaration: false,
  });

  const handleCheckboxChange = (e) => {
    setSameAsAddress(e.target.checked);
    setFormData((prev) => ({
      ...prev,
      permanentAddress: e.target.checked ? prev.address : "",
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && Array.isArray(formData[name])) {
      setFormData({
        ...formData,
        [name]: checked
          ? [...formData[name], value]
          : formData[name].filter((item) => item !== value),
      });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({
        ...formData,
        [name]: value,
        ...(sameAsAddress && name === "address" ? { permanentAddress: value } : {}),
      });
    }
  };

  return (
    <Container>
      <Box sx={{ width: "80%", margin: "auto", mt: 5 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Registration Form
        </Typography>

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
          label="Address"
          margin="normal"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <FormControlLabel
          control={<Checkbox checked={sameAsAddress} onChange={handleCheckboxChange} />}
          label="Same as Address"
        />
        <TextField
          fullWidth
          label="Permanent Address"
          margin="normal"
          name="permanentAddress"
          value={formData.permanentAddress}
          onChange={handleChange}
          disabled={sameAsAddress}
        />

        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
////////////////////////////////////////////////////////////////
<TextField
          fullWidth
          label="Institution/School Name"
          margin="normal"
          name="institution"
          value={formData.institution}
          onChange={handleChange}
        />
        
        {formData.qualification === "Graduate" && (
          <TextField
            fullWidth
            label="Year of Graduation"
            margin="normal"
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleChange}
          />
        )}
      <Typography variant="body1" sx={{ mt: 2 }}>Experience (If Applicable)</Typography>
      <RadioGroup
        row
        name="experience"
        value={formData.experience}
        onChange={handleChange}
      >
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>
      {formData.experience === "yes" && (
        <TextField
          fullWidth
          label="If yes, please specify"
          margin="normal"
          name="relevantExperience"
          value={formData.relevantExperience}
          onChange={handleChange}
        />
      )}


      /////////////////////////////////////////////////////
