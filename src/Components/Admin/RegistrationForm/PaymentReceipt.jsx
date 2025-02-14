import React from 'react';
import { RadioGroup, Radio, FormControlLabel, FormLabel, TextField, Typography } from '@mui/material';

const PaymentReceipt = ({ formData, handleChange }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Payment Receipt
      </Typography>
      <FormLabel component="legend">Payment Mode</FormLabel>
      <RadioGroup
        name="paymentMode"
        value={formData.paymentMode}
        onChange={handleChange}
      >
        {['Cash', 'UPI', 'Credit Card', 'Debit Card', 'Bank Transfer'].map((mode) => (
          <FormControlLabel key={mode} value={mode} control={<Radio />} label={mode} />
        ))}
      </RadioGroup>
      {formData.paymentMode !== 'Cash' && (
        <TextField
          margin="normal"
          fullWidth
          label="Transaction ID"
          name="transactionId"
          value={formData.transactionId}
          onChange={handleChange}
        />
      )}
      <TextField
        margin="normal"
        fullWidth
        label="Course Fees"
        name="courseFees"
        value={formData.courseFees}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Fee Received"
        name="feeReceived"
        value={formData.feeReceived}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Balance"
        name="balance"
        value={formData.balance}
        onChange={handleChange}
      />
    </>
  );
};

export default PaymentReceipt;
