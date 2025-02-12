import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CreateNotice = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [date, setDate] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate();

  // Fetch notices from localStorage when component loads
  useEffect(() => {
    const storedNotices = JSON.parse(localStorage.getItem("notices")) || [];
    setNotices(storedNotices);
  }, []);

  // Handle saving a new notice
  const handleSave = () => {
    if (!title || !details || !postedBy || !date) {
      setOpenSnackbar(true);
      return;
    }

    // Get current date and time
    const postTime = new Date().toLocaleString(); // Format: "MM/DD/YYYY, HH:mm:ss AM/PM"
    
    const newNotice = { title, details, postedBy, date, postTime };
    // Prepend the new notice to the beginning of the notices array
    const updatedNotices = [newNotice, ...notices];
    localStorage.setItem("notices", JSON.stringify(updatedNotices));

    setNotices(updatedNotices);
    setTitle("");
    setDetails("");
    setPostedBy("");
    setDate("");
    setOpenSnackbar(true);
  };

  // Handle deleting a notice
  const handleDelete = (index) => {
    const updatedNotices = notices.filter((_, i) => i !== index);
    localStorage.setItem("notices", JSON.stringify(updatedNotices));
    setNotices(updatedNotices);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box
        component={Paper}
        elevation={2}
        sx={{ p: 3, backgroundColor: "#f9f9f9", mb: 4 }}
      >
        <Typography variant="h5" gutterBottom>
          Create A Notice
        </Typography>

        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            fullWidth
            label="Details"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <TextField
            fullWidth
            label="Posted By"
            variant="outlined"
            margin="normal"
            value={postedBy}
            onChange={(e) => setPostedBy(e.target.value)}
          />
          <TextField
            fullWidth
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            margin="normal"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button variant="contained" color="success" onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                setTitle("");
                setDetails("");
                setPostedBy("");
                setDate("");
              }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Displaying Notices */}
      <Box>
        {notices.map((notice, index) => (
          <Paper key={index} sx={{ p: 2, mb: 2, backgroundColor: "#f1f1f1" }}>
            <Typography variant="caption" sx={{ color: "red", fontWeight: "bold" }}>
              {notice.date}
            </Typography>
            <Typography
              variant="h6"
              sx={{ mt: 1, fontWeight: "bold", color: "#1976d2" }}
            >
              {notice.title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {notice.details}
            </Typography>
            <Typography variant="caption" sx={{ fontStyle: "italic", color: "#555" }}>
              - Posted by {notice.postedBy}
            </Typography>
            <Typography variant="caption" sx={{ fontStyle: "italic", color: "#555", display: "block", mt: 1 }}>
              Posted at: {notice.postTime} 
            </Typography>

            <IconButton
              onClick={() => handleDelete(index)}
              sx={{ color: "red", ml: 2 }}
            >
              <Delete />
            </IconButton>
          </Paper>
        ))}
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Notice has been successfully sent!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateNotice;
