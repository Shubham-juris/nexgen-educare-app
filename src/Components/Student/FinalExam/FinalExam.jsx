import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const FinalExam = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" component="h1" sx={{ marginBottom: 4, color: 'red' }}>
      Final Exam
      </Typography>
      <TableContainer component={Paper} sx={{  }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Subject</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Duration</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Total Mark</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">20-01-25</TableCell>
              <TableCell align="center">Web</TableCell>
              <TableCell align="center">2 hours</TableCell>
              <TableCell align="center">90</TableCell>
              <TableCell align="center">Pending</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FinalExam;
