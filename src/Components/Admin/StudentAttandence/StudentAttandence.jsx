import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
} from "@mui/material";

const StudentAttendance = () => {
  // Sample data for the students
  const students = [
    { id: 1, name: "Vinay", attendance: [true, true, false, true, true, true, true, true, true, true] },
    { id: 2, name: "Shubham", attendance: [true, true, false, true, true, true, true, true, true, true] },
    { id: 3, name: "Nikhil", attendance: [true, true, false, true, true, true, true, true, true, true] },
  ];

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedSession, setSelectedSession] = useState("");

  const handleSave = () => {
    console.log("Attendance saved for:", {
      selectedClass,
      selectedMonth,
      selectedSession,
    });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Student Attendance
      </Typography>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 4 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Select Class</InputLabel>
          <Select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <MenuItem value={"Class 1"}>Class 1</MenuItem>
            <MenuItem value={"Class 2"}>Class 2</MenuItem>
            <MenuItem value={"Class 3"}>Class 3</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Select Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <MenuItem value={"January"}>January</MenuItem>
            <MenuItem value={"February"}>February</MenuItem>
            <MenuItem value={"March"}>March</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Select Session</InputLabel>
          <Select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
          >
            <MenuItem value={"Morning"}>Morning</MenuItem>
            <MenuItem value={"Afternoon"}>Afternoon</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Attendance Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableCell key={index}>Day {index + 1}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                {student.attendance.map((attended, index) => (
                  <TableCell key={index}>
                    <Checkbox checked={attended} disabled />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Save Button */}
      <Box sx={{ marginTop: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Attendance
        </Button>
      </Box>
    </Box>
  );
};

export default StudentAttendance;

