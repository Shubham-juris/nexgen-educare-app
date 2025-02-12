import React from 'react';
import { Box, Typography, Divider, Paper } from '@mui/material';

const FeeDetails = () => (
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
      sx={{ color: 'red', marginBottom: 4 }}
    >
      Fee
    </Typography>

    <Paper
      elevation={3}
      sx={{
        width: '100%',
        maxWidth: 700,
        padding: 3,
        backgroundColor: '#e0e0e0',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
        <Typography variant="body1" fontWeight="bold">
          Student ID
        </Typography>
        <Typography variant="body1">#01</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
        <Typography variant="body1" fontWeight="bold">
          Course Name
        </Typography>
        <Typography variant="body1">Sumit</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
        <Typography variant="body1" fontWeight="bold">
          Course Duration
        </Typography>
        <Typography variant="body1">6 Month</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
        <Typography variant="body1" fontWeight="bold">
          Course Type
        </Typography>
        <Typography variant="body1">Online/Offline</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
        <Typography variant="body1" fontWeight="bold">
          Total Fee
        </Typography>
        <Typography variant="body1">40,000</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
        <Typography variant="body1" fontWeight="bold">
          Paid Fee
        </Typography>
        <Typography variant="body1">10,000</Typography>
      </Box>

      <Divider sx={{ backgroundColor: '#d1c4e9', marginY: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1" fontWeight="bold">
          Unpaid Fee
        </Typography>
        <Typography variant="body1">30,000</Typography>
      </Box>
    </Paper>
  </Box>
);

export default FeeDetails;
