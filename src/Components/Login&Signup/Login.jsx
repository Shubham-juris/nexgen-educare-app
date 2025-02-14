import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
  Link,
} from '@mui/material';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LoginImage from '../../assets/Login&Signup/Login&Signup.jpg';

const Login = ({ onLogin }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  // Hardcoded credentials
  const validCredentials = {
    userId: 'student',
    password: '1234',
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userId = formData.get('userId');
    const password = formData.get('password');

    if (
      userId === validCredentials.userId &&
      password === validCredentials.password
    ) {
      setOpenSnackbar(true);
      setLoginError('');
      onLogin({ userId });
      setTimeout(() => {
        navigate('/Sdashboard');
      }, 1000);
    } else {
      setLoginError('Invalid ID or password');
    }

    setFormKey((prevKey) => prevKey + 1);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShow) => !prevShow);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${LoginImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container maxWidth='xs'>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          data-aos='fade-up'
        >
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.85)',
              padding: 4,
              borderRadius: 2,
              boxShadow: 3,
              position: 'relative',
              width: '100%',
            }}
          >
            <IconButton
              onClick={() => navigate(-1)}
              sx={{ position: 'absolute', top: 10, left: 10 }}
            >
              <ArrowBack />
            </IconButton>

            <Typography component='h1' variant='h5'>
              Login
            </Typography>
            <Box
              key={formKey}
              component='form'
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='userId'
                label='ID'
                name='userId'
                autoComplete='username'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type={showPassword ? 'text' : 'password'}
                id='password'
                autoComplete='current-password'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {loginError && (
                <Typography color='error' sx={{ mt: 1, textAlign: 'center' }}>
                  {loginError}
                </Typography>
              )}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link href='#' variant='body2' sx={{ textDecoration: 'none' }}>
                  Forgot password?
                </Link>
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='success'
          sx={{ width: '100%' }}
        >
          Login successful! Redirecting...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
