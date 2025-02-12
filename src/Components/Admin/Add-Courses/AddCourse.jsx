import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
} from "@mui/material";

const AddCourse = () => {
  const courseTypes = ["Technical", "Non-Technical", "Management"];
  const codes = ["Code A", "Code B", "Code C"];

  return (
    <Container maxWidth="sm" sx={{ mt: 4, p: 3, backgroundColor: "#f9f9f9" }}>
      <Typography variant="h5" gutterBottom>
        Add New Courses
      </Typography>

      <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Course Name"
          variant="outlined"
          margin="normal"
        />

        <TextField
          fullWidth
          select
          label="Course Type"
          variant="outlined"
          margin="normal"
        >
          {courseTypes.map((type, index) => (
            <MenuItem key={index} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          select
          label="Select Code"
          variant="outlined"
          margin="normal"
        >
          {codes.map((code, index) => (
            <MenuItem key={index} value={code}>
              {code}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button variant="contained" color="error">
            Save
          </Button>
          <Button variant="contained" color="warning">
            Reset
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddCourse;
