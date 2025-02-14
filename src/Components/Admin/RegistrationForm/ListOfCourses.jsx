import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FormControlLabel, Checkbox, RadioGroup, Radio, TextField, Typography, Container, Box } from '@mui/material';

const ListOfCourses = ({ formData, handleChange }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get-courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      <Typography variant="h6" sx={{ mt: 4 }}>Course Information</Typography>
      
      <Container>
          <Box>
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
    </>
  );
};

export default ListOfCourses;
