import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from '@mui/material';
import RegistrationForm from './RegistrationForm';
import StudentDetailsModal from './ViewFrom';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get('http://localhost:3000/get-registrations')
      .then((response) => {
        setStudents(response.data.registrations);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  };

  const handleRegisterClick = () => {
    setShowForm(true);
  };

  const handleViewClick = (studentId) => {
    const student = students.find((s) => s.student_id === studentId);
    if (student) {
      setSelectedStudent(student);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Box>
      {showForm ? (
        <RegistrationForm />
      ) : (
        <>
          <Typography variant='h4' gutterBottom>
            All Students Data
          </Typography>
          <Button
            variant='contained'
            color='primary'
            onClick={handleRegisterClick}
            sx={{ mb: 2 }}
          >
            Register New Student
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.studentName}</TableCell>
                    <TableCell>{student.student_id}</TableCell>
                    <TableCell>{student.phoneNumber}</TableCell>
                    <TableCell>
                      <Button
                        variant='contained'
                        color='secondary'
                        onClick={() => handleViewClick(student.student_id)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Student Details Modal */}
          {selectedStudent && showModal && (
            <StudentDetailsModal
              student={selectedStudent}
              onClose={handleCloseModal}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default StudentList;
