import React, { useState } from "react";
import { 
  Box, Button, TextField, Typography, Modal, 
  Select, MenuItem, FormControl, InputLabel, Snackbar, Alert, IconButton
} from "@mui/material";
import { Close } from "@mui/icons-material";

const TeacherForm = ({ open, handleClose, handleChange, handleSubmit, newTeacher, courses }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const validateForm = () => {
    return (
      newTeacher.first_name.trim() !== "" &&
      newTeacher.last_name.trim() !== "" &&
      newTeacher.gender.trim() !== "" &&
      newTeacher.courses.trim() !== ""
    );
  };

  const handleFormSubmit = () => {
    if (!validateForm()) return;
    handleSubmit();
    setSnackbarOpen(true);
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
            width: 600,
            bgcolor: "white",
            boxShadow: 24,
        
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <Close />
          </IconButton>

          <Typography variant="h6" gutterBottom>
            Add New Teacher
          </Typography>

          <TextField
            fullWidth
            label="First Name"
            name="first_name"
            value={newTeacher.first_name}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Last Name"
            name="last_name"
            value={newTeacher.last_name}
            onChange={handleChange}
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Gender</InputLabel>
            <Select name="gender" value={newTeacher.gender} onChange={handleChange}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Courses</InputLabel>
            <Select name="courses" value={newTeacher.courses} onChange={handleChange}>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <MenuItem key={course.id} value={course.name}>
                    {course.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Courses Available</MenuItem>
              )}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
            sx={{ mt: 2 }}
            disabled={!validateForm()}
          >
            Save
          </Button>
        </Box>
      </Modal>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Teacher added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default TeacherForm;
