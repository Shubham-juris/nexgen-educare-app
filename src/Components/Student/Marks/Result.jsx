import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';

const MockTestResult = () => (
  <Paper
    elevation={3}
    sx={{
      width: '100%',
      maxWidth: 800,
      padding: 3,
      marginBottom: 2,
      backgroundColor: '#e0e0e0',
    }}
  >
    <Typography
      variant="h6"
      component="h2"
      sx={{
        marginBottom: 2,
        color: 'red',
        fontWeight: 'bold',
      }}
    >
      Mock Test Result
    </Typography>
    <Typography variant="body2" component="p" sx={{ marginBottom: 1 }}>
      Obtain Marks: 300
    </Typography>
    <Typography variant="body2" component="p" sx={{ marginBottom: 1 }}>
      Grade: A*
    </Typography>
    <Typography variant="body2" component="p" sx={{ marginBottom: 2 }}>
      Status: Pass
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-40px' }}>
      <Button
        variant="contained"
        color="error"
        sx={{ textTransform: 'none', fontWeight: 'bold' }}
      >
        View all details
      </Button>
    </Box>
  </Paper>
);

const MidtermExamResult = () => (
  <Paper
    elevation={3}
    sx={{
      width: '100%',
      maxWidth: 800,
      padding: 3,
      marginBottom: 2,
      backgroundColor: '#e0e0e0',
    }}
  >
    <Typography
      variant="h6"
      component="h2"
      sx={{
        marginBottom: 2,
        color: 'red',
        fontWeight: 'bold',
      }}
    >
      Midterm Exam Result
    </Typography>
    <Typography variant="body2" component="p" sx={{ marginBottom: 1 }}>
      Obtain Marks: 300
    </Typography>
    <Typography variant="body2" component="p" sx={{ marginBottom: 1 }}>
      Grade: B*
    </Typography>
    <Typography variant="body2" component="p" sx={{ marginBottom: 2 }}>
      Status: Pass
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-40px' }}>
      <Button
        variant="contained"
        color="error"
        sx={{ textTransform: 'none', fontWeight: 'bold' }}
      >
        View all details
      </Button>
    </Box>
  </Paper>
);

const FinalExamResult = () => (
  <Paper
    elevation={3}
    sx={{
      width: '100%',
      maxWidth: 800,
      padding: 3,
      marginBottom: 2,
      backgroundColor: '#e0e0e0',
    }}
  >
    <Typography
      variant="h6"
      component="h2"
      sx={{
        marginBottom: 2,
        color: 'red',
        fontWeight: 'bold',
      }}
    >
      Final Exam Result
    </Typography>
    <Typography variant="body2" component="p" sx={{ marginBottom: 1 }}>
      Obtain Marks: 300
    </Typography>
    <Typography variant="body2" component="p" sx={{ marginBottom: 1 }}>
      Grade: A*
    </Typography>
    <Typography variant="body2" component="p" sx={{ marginBottom: 2 }}>
      Status: Pass
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-40px' }}>
      <Button
        variant="contained"
        color="error"
        sx={{ textTransform: 'none', fontWeight: 'bold' }}
      >
        View all details
      </Button>
    </Box>
  </Paper>
);

const Result = () => {
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
      <Typography
        variant="h4"
        component="h1"
        sx={{ marginBottom: 4, color: 'red' }}
      >
        Result
      </Typography>
      <MockTestResult />
      <MidtermExamResult />
      <FinalExamResult />
    </Box>
  );
};

export default Result;
