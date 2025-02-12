import React from "react";
import {
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";

const CourseRoutine = () => {
  return (
    <Grid container spacing={3} p={3}>
      {/* Search Section */}
      <Grid item xs={12} container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <TextField label="Search by name" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Search by class" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={3}>
          <TextField label="Search by section" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" color="primary" fullWidth>
            Search
          </Button>
        </Grid>
      </Grid>

      {/* Table Section */}
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Teacher</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Monday</TableCell>
                <TableCell>6th</TableCell>
                <TableCell>Dev...</TableCell>
                <TableCell>xyz</TableCell>
                <TableCell>10.00</TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow>
                <TableCell>Monday</TableCell>
                <TableCell>6th</TableCell>
                <TableCell>Dev...</TableCell>
                <TableCell>xyz</TableCell>
                <TableCell>10.00</TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow>
                <TableCell>Monday</TableCell>
                <TableCell>6th</TableCell>
                <TableCell>Dev...</TableCell>
                <TableCell>xyz</TableCell>
                <TableCell>10.00</TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow>
                <TableCell>Monday</TableCell>
                <TableCell>6th</TableCell>
                <TableCell>Dev...</TableCell>
                <TableCell>xyz</TableCell>
                <TableCell>10.00</TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow>
                <TableCell>Monday</TableCell>
                <TableCell>6th</TableCell>
                <TableCell>Dev...</TableCell>
                <TableCell>xyz</TableCell>
                <TableCell>10.00</TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow>
                <TableCell>Monday</TableCell>
                <TableCell>6th</TableCell>
                <TableCell>Dev...</TableCell>
                <TableCell>xyz</TableCell>
                <TableCell>10.00</TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow>
                <TableCell>Monday</TableCell>
                <TableCell>6th</TableCell>
                <TableCell>Dev...</TableCell>
                <TableCell>xyz</TableCell>
                <TableCell>10.00</TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow>
                <TableCell>Monday</TableCell>
                <TableCell>6th</TableCell>
                <TableCell>Dev...</TableCell>
                <TableCell>xyz</TableCell>
                <TableCell>10.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {/* Add New Course Routine Section */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Add New Course Routine
        </Typography>
      </Grid>

      <Grid item xs={12} container spacing={2}>
        <Grid item xs={4}>
          <TextField label="Course Name" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <Select variant="outlined" fullWidth defaultValue="">
            <MenuItem value="">Select Course Type</MenuItem>
            <MenuItem value="Theory">Theory</MenuItem>
            <MenuItem value="Lab">Lab</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4}>
          <TextField label="Course Code" variant="outlined" fullWidth />
        </Grid>

        <Grid item xs={6}>
          <Button variant="contained" color="warning" fullWidth size="small">
            Save
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="error" fullWidth size="small">
            Reset
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CourseRoutine;
