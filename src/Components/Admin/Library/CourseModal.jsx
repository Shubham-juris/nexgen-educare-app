import React, { useState } from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Alert,
} from "@mui/material";

const CourseModal = ({ open, onClose, setCourses }) => {
  const [newCourse, setNewCourse] = useState({
    name: "",
    code: "",
    price: "",
    file: "",
    image: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewCourse((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async () => {
    if (!newCourse.name || !newCourse.code || !newCourse.price || !newCourse.file || !newCourse.image ) {
      setError("all courses are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newCourse.name);
    formData.append("code", newCourse.code);
    formData.append("price", newCourse.price);
    if (newCourse.file) formData.append("file", newCourse.file);
    if (newCourse.image) formData.append("image", newCourse.image);

    try {
      const response = await fetch("http://localhost:3000/api/courses", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const newCourseFromServer = await response.json();
        setCourses((prev) => [...prev, newCourseFromServer]);
        onClose();
        setError("");
      } else {
        setError("Failed to add course. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while adding the course.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Course</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          margin="dense"
          label="Course Name"
          name="name"
          fullWidth
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Course Code"
          name="code"
          fullWidth
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Course Price"
          name="price"
          type="number"
          fullWidth
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          type="file"
          name="file"
          fullWidth
          onChange={handleInputChange}
          inputProps={{ accept: ".pptx" }}
        />
        <TextField
          margin="dense"
          type="file"
          name="image"
          fullWidth
          onChange={handleInputChange}
          inputProps={{ accept: "image/*" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourseModal;
