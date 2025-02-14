// PersonalInformation.js
import React from 'react';
import { TextField, FormControlLabel, Checkbox, Typography, Radio, RadioGroup, FormControl, FormLabel, FormHelperText } from '@mui/material';

const PersonalInformation = ({ formData, handleChange }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <TextField margin="normal" required fullWidth label="Student Name" name="studentName" value={formData.studentName} onChange={handleChange} />
      <TextField margin="normal" required fullWidth label="Father's Name" name="fatherName" value={formData.fatherName} onChange={handleChange} />
      <TextField margin="normal" required fullWidth label="Mother's Name" name="motherName" value={formData.motherName} onChange={handleChange} />
      <TextField margin="normal" required fullWidth label="Date of Birth" type="date" name="dateOfBirth" InputLabelProps={{ shrink: true }} value={formData.dateOfBirth} onChange={handleChange} />
      
      <FormControl component="fieldset" margin="normal" required>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
      
      <TextField margin="normal" required fullWidth label="Email Address" name="emailAddress" type="email" value={formData.emailAddress} onChange={handleChange} />
      <TextField margin="normal" required fullWidth label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} />
      <TextField margin="normal" required fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} />
      
      <FormControlLabel control={<Checkbox name="sameAsPermanentAddress" checked={formData.sameAsPermanentAddress} onChange={handleChange} />} label="Same as Permanent Address" />
      {!formData.sameAsPermanentAddress && (
        <TextField margin="normal" required fullWidth label="Permanent Address" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} />
      )}
    </>
  );
};
export default PersonalInformation;
