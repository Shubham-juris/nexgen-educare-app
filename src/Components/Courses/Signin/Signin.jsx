import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import AOS from 'aos';
import 'aos/dist/aos.css';

import boxImage from '../../../assets/Courses/SignIn/Box.png';
import ellipseImage from '../../../assets/Courses/SignIn/Ellipse.png';
import { Link } from 'react-router-dom';

const SignUpBanner = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#FF564F',
        borderRadius: '100px',
        padding: { xs: '20px', sm: '30px', md: '40px' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        textAlign: 'center',
        mt: '4%',
        mb: '4%',
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          width: '100%',
        }}
      >
        <Grid
          container
          spacing={4}
          alignItems='center'
          justifyContent='center'
          sx={{ gap: { xs: 4, md: 16 } }}
        >
          {/* Images Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'space-around' },
              alignItems: 'center',
              gap: { xs: 2, md: 10 },
            }}
            data-aos='fade-right'
          >
            <Box
              component='img'
              src={boxImage}
              alt='Box'
              sx={{
                width: '110px',
                height: '150px',
                objectFit: 'cover',
              }}
            />
            <Box
              component='img'
              src={ellipseImage}
              alt='Ellipse'
              sx={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          </Grid>

          {/* Text Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              textAlign: { xs: 'center', md: 'left' },
            }}
            data-aos='fade-left'
          >
            <Typography
              variant='h4'
              sx={{
                fontWeight: 'bold',
                marginBottom: '16px',
              }}
            >
              Start for free
            </Typography>
            <Typography
              variant='body1'
              sx={{
                marginBottom: '24px',
              }}
            >
              If you've made it this far, you must be at least a little curious.{' '}
              <br />
              Sign up and take the first step toward your goals.
            </Typography>
            <Link to="/Login" style={{ textDecoration: 'none' }}> {/* Replace '/signup' with your desired path */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#fff',
          color: '#FF564F',
          fontWeight: 'bold',
          padding: '10px 20px',
          borderRadius: '50px',
          textTransform: 'none',
        }}
      >
        Log in 
      </Button>
    </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUpBanner;
