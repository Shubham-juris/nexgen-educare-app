import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

const MessagePage = () => {
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleSubmit = () => {
    // Simulate submission
    setSuccess(true);
    setError(false);
  };

  const handleReset = () => {
    setSuccess(false);
    setError(false);
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Message Page
        </Typography>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Title" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Recipient" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" onClick={handleReset}>
              Reset
            </Button>
          </Grid>
        </Grid>
        <Box mt={2}>
          {success && <Alert severity="success">Message sent successfully!</Alert>}
          {error && <Alert severity="error">Error sending message.</Alert>}
        </Box>
      </Box>
    </Container>
  );
};

export default MessagePage;
