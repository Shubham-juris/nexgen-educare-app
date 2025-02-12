import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
  TablePagination,
  TextField,
  InputAdornment,
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
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [newTeacher, setNewTeacher] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    courses: "",
  });

  useEffect(() => {
    fetchTeachers();
    fetchCourses();
  }, []);

  const fetchTeachers = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/get-teachers")
      .then((response) => setTeachers(response.data))
      .catch((error) => console.error("Error fetching teachers:", error))
      .finally(() => setLoading(false));
  };

  const fetchCourses = () => {
    axios
      .get("http://localhost:3000/get-courses")
      .then((response) => {
        console.log("Fetched Courses:", response.data); // Debugging
        setCourses(response.data);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  };

  const handleChange = (e) => {
    setNewTeacher({ ...newTeacher, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/add-teacher", newTeacher)
      .then(() => {
        fetchTeachers();
        setOpen(false);
        setNewTeacher({ first_name: "", last_name: "", gender: "", courses: "" });
      })
      .catch((error) => console.error("Error adding teacher:", error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/delete-teacher/${id}`)
      .then(() => fetchTeachers())
      .catch((error) => console.error("Error deleting teacher:", error));
  };

  const filteredTeachers = teachers.filter((t) =>
    t.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          All Teachers Data
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <TextField
            label="Search Teacher"
            variant="outlined"
            size="small"
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setOpen(true)}>
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
          <Box display="flex" justifyContent="center" mt={3}>
            <CircularProgress />
          </Box>
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
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDelete(teacher.id)}>
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
              rowsPerPage={rowsPerPage}
              onPageChange={(e, newPage) => setPage(newPage)}
              onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
            />
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};

export default TeacherData;
