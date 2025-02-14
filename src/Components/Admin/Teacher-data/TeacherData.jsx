import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box, Button, Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, CircularProgress,
  IconButton, TablePagination, TextField, InputAdornment, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@mui/material";
import { Edit, Delete, Search, Add } from "@mui/icons-material";
import TeacherForm from "./TeacherForm";

const TeacherData = () => {
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [newTeacher, setNewTeacher] = useState({ id: "", first_name: "", last_name: "", gender: "", courses: "" });
  const [editMode, setEditMode] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  useEffect(() => {
    fetchTeachers();
    fetchCourses();
  }, []);

  const fetchTeachers = () => {
    setLoading(true);
    axios.get("http://localhost:3000/get-teachers")
      .then((response) => setTeachers(response.data))
      .catch((error) => console.error("Error fetching teachers:", error))
      .finally(() => setLoading(false));
  };

  const fetchCourses = () => {
    axios.get("http://localhost:3000/get-courses")
      .then((response) => setCourses(response.data))
      .catch((error) => console.error("Error fetching courses:", error));
  };

  const handleChange = (e) => {
    setNewTeacher({ ...newTeacher, [e.target.name]: e.target.value });
  };

  // Handle Add / Update
  const handleSubmit = () => {
    if (!newTeacher.first_name || !newTeacher.last_name || !newTeacher.gender || !newTeacher.courses) {
      alert("All fields are required!");
      return;
    }

    if (editMode) {
      // Update teacher
      axios.put(`http://localhost:3000/update-teacher/${newTeacher.id}`, newTeacher)
        .then(() => {
          fetchTeachers();
          setOpen(false);
          resetForm();
        })
        .catch((error) => console.error("Error updating teacher:", error));
    } else {
      // Add new teacher
      axios.post("http://localhost:3000/add-teacher", newTeacher)
        .then(() => {
          fetchTeachers();
          setOpen(false);
          resetForm();
        })
        .catch((error) => console.error("Error adding teacher:", error));
    }
  };

  const resetForm = () => {
    setNewTeacher({ id: "", first_name: "", last_name: "", gender: "", courses: "" });
    setEditMode(false);
  };

  // Handle Edit
  const handleEdit = (teacher) => {
    setNewTeacher(teacher);
    setEditMode(true);
    setOpen(true);
  };

  // Handle Delete Confirmation
  const handleDeleteConfirm = (id) => {
    setDeleteConfirm({ open: true, id });
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:3000/delete-teacher/${deleteConfirm.id}`)
      .then(() => {
        fetchTeachers();
        setDeleteConfirm({ open: false, id: null });
      })
      .catch((error) => console.error("Error deleting teacher:", error));
  };

  const filteredTeachers = teachers.filter((t) =>
    t.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>All Teachers Data</Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <TextField
            label="Search Teacher"
            variant="outlined"
            size="small"
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }}
          />
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => { resetForm(); setOpen(true); }}>
            Add Teacher
          </Button>
        </Box>

        <TeacherForm 
          open={open} 
          handleClose={() => setOpen(false)} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit} 
          newTeacher={newTeacher} 
          courses={courses} 
        />

        {loading ? (
          <Box display="flex" justifyContent="center" mt={3}><CircularProgress /></Box>
        ) : (
          <TableContainer component={Paper}>
            <TablePagination
              component="div"
              count={filteredTeachers.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={(e, newPage) => setPage(newPage)}
              onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
            />

            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Courses</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTeachers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>{teacher.id}</TableCell>
                    <TableCell>{teacher.first_name}</TableCell>
                    <TableCell>{teacher.last_name}</TableCell>
                    <TableCell>{teacher.gender}</TableCell>
                    <TableCell>{teacher.courses}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEdit(teacher)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDeleteConfirm(teacher.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={filteredTeachers.length}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
            />
          </TableContainer>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirm.open} onClose={() => setDeleteConfirm({ open: false, id: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this teacher?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm({ open: false, id: null })} color="primary">No</Button>
          <Button onClick={handleDelete} color="secondary">Yes</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TeacherData;
