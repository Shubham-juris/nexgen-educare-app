import React from 'react';
import { TextField, FormControlLabel, Checkbox, Typography, Box } from '@mui/material';

const EducationalBackground = ({ formData, handleChange }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Educational Background
      </Typography>
      {[
        { level: 'highSchool', label: 'High School' },
        { level: 'intermediate', label: 'Intermediate' },
        { level: 'bachelorDegree', label: 'Bachelor Degree' },
        { level: 'masterDegree', label: 'Master Degree' },
      ].map(({ level, label }) => (
        <Box key={level}>
          <FormControlLabel
            control={
              <Checkbox
                name={`${level}.completed`}
                checked={formData[level]?.completed || false}
                onChange={handleChange}
              />
            }
            label={label}
          />
          {formData[level]?.completed && (
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField label="Institute Name" name={`${level}.instituteName`} value={formData[level]?.instituteName || ''} onChange={handleChange} fullWidth />
              <TextField label="Board/University" name={`${level}.boardUniversity`} value={formData[level]?.boardUniversity || ''} onChange={handleChange} fullWidth />
              <TextField label="Year of Passing" name={`${level}.yearOfPassing`} value={formData[level]?.yearOfPassing || ''} onChange={handleChange} fullWidth />
              <TextField label="Percentage/Grade" name={`${level}.percentageGrade`} value={formData[level]?.percentageGrade || ''} onChange={handleChange} fullWidth />
            </Box>
          )}
        </Box>
      ))}
      <TextField margin="normal" fullWidth label="Additional Certifications (if any)" name="additionalCertifications" value={formData.additionalCertifications || ''} onChange={handleChange} />
    </>
  );
};

export default EducationalBackground;
