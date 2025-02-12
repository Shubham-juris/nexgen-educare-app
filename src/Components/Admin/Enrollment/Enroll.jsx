import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import axios from 'axios'; // Import axios for HTTP requests

const RegistrationForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    contactNumber: "",
    email: "",
    address: "",
    courses: [],
    preferredTiming: "",
    reason: "",
    qualification: [],
    institution: "",
    graduationYear: "",
    experience: "",
    relevantExperience: "",
    paymentOption: "",
    paymentMethod: "",
    transactionId: "",
    declaration: false,
  });

  const steps = [
    "Personal Information",
    "Course Information",
    "Educational Background",
    "Payment Information",
  ];

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

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

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/save-registration', formData);
      alert(response.data.message);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
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
              label="Last Name"
              margin="normal"
              name="lastName"
              value={formData.lastName}
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
            <Typography variant="body1" sx={{ mt: 2 }}>
              Gender
            </Typography>
            <RadioGroup
              row
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
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
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6">Course Information</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Courses
            </Typography>
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
            <Typography variant="body1" sx={{ mt: 2 }}>
              Preferred Batch Timing
            </Typography>
            <RadioGroup
              row
              name="preferredTiming"
              value={formData.preferredTiming}
              onChange={handleChange}
            >
              <FormControlLabel
                value="morning"
                control={<Radio />}
                label="Morning"
              />
              <FormControlLabel
                value="afternoon"
                control={<Radio />}
                label="Afternoon"
              />
              <FormControlLabel
                value="evening"
                control={<Radio />}
                label="Evening"
              />
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
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6">Educational Background</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Highest Qualification
            </Typography>
            {["High School", "Graduate", "Postgraduate"].map((option) => (
              <FormControlLabel
                control={
                  <Checkbox
                    name="qualification"
                    value={option}
                    checked={formData.qualification.includes(option)}
                    onChange={handleChange}
                  />
                }
                label={option}
                key={option}
              />
            ))}
            <TextField
              fullWidth
              label="Institution/School Name"
              margin="normal"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
            />
            {formData.qualification.includes("Graduate") && (
              <TextField
                fullWidth
                label="Year of Graduation"
                margin="normal"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
              />
            )}
            <Typography variant="body1" sx={{ mt: 2 }}>
              Experience (If Applicable)
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              Do you have any relevant experience?
            </Typography>
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
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6">Payment Information</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Course Fee Payment Option
            </Typography>
            <RadioGroup
              row
              name="paymentOption"
              value={formData.paymentOption}
              onChange={handleChange}
            >
              <FormControlLabel
                value="full"
                control={<Radio />}
                label="Full Payment"
              />
              <FormControlLabel
                value="installments"
                control={<Radio />}
                label="Installments"
              />
            </RadioGroup>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Payment Method
            </Typography>
            <RadioGroup
              row
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              {["Cash", "Credit/Debit Card", "Bank Transfer", "UPI"].map(
                (method) => (
                  <FormControlLabel
                    key={method}
                    value={method}
                    control={<Radio />}
                    label={method}
                  />
                )
              )}
            </RadioGroup>
            <TextField
              fullWidth
              label="Transaction ID (if applicable)"
              margin="normal"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
            />
          </Box>
        );
      default:
        return (
          <Typography variant="h6">
            Thank you! Your application has been submitted.
          </Typography>
        );
    }
  };

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 5 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 3 }}>{getStepContent(activeStep)}</Box>
      <Box sx={{ mt: 2 }}>
        {activeStep > 0 && (
          <Button onClick={handleBack} sx={{ mr: 2 }}>
            Back
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={
            activeStep === steps.length ||
            (activeStep === steps.length - 1 && !formData.declaration)
          }
        >
          {activeStep === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </Box>
    </Box>
  );
};

export default RegistrationForm;
