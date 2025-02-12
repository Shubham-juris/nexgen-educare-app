import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";

const TeacherForm = ({ open, handleClose, handleChange, handleSubmit, newTeacher, courses }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSave = () => {
    handleSubmit(); // Call parent submit function
    setSnackbarOpen(true); // Show success message
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 420,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold" align="center" color="primary" gutterBottom>
            Add New Teacher
          </Typography>

          <TextField fullWidth label="First Name" name="first_name" value={newTeacher.first_name} onChange={handleChange} />
          <TextField fullWidth label="Last Name" name="last_name" value={newTeacher.last_name} onChange={handleChange} />

          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select name="gender" value={newTeacher.gender} onChange={handleChange}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Courses</InputLabel>
            <Select name="courses" value={newTeacher.courses} onChange={handleChange}>
              {courses.length > 0 ? (
                courses.map((course) => <MenuItem key={course.id} value={course.name}>{course.name}</MenuItem>)
              ) : (
                <MenuItem disabled>No Courses Available</MenuItem>
              )}
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
            Save Teacher
          </Button>
        </Box>
      </Modal>

      {/* ✅ Snackbar Message */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Teacher saved successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default TeacherForm;
