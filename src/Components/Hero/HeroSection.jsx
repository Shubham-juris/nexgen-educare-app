import React, { useEffect } from 'react';
import { Box, Typography, keyframes } from '@mui/material';
import AOS from 'aos'; // Import AOS for animations
import 'aos/dist/aos.css'; // Import AOS styles
//  // import Hero from '../../assets/Hero/demo1.jpg' ;
// import Hero from '../../assets/Hero/demo2.jpg' ;
import Hero from '../../assets/Hero/demo4.png'; 
import { red } from '@mui/material/colors';

// Keyframes for background animation
const backgroundAnimation = keyframes`
  0% { background-position: center top; }
  50% { background-position: center center; }
  100% { background-position: center bottom; }
`;

// Keyframes for fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HeroSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500, // Animation duration
      offset: 50, // Offset from the top
    });
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: 2, sm: 4, md: 6 },
        backgroundImage: `url(${Hero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        animation: `${backgroundAnimation} 10s ease-in-out infinite alternate`,
        height: '100vh',
        color: 'white',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center', 
          padding: { xs: 2, md: 4 },
          animation: `${fadeIn} 1.5s ease-out`,
        }}
      >
        <Typography
          variant='h3'
          sx={{
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(248, 5, 5, 0.99)',
            fontSize: { xs: '1.6rem', sm: '2.2rem', md: '3rem' },
          }}
        >
          Welcome to Our Learning Platform
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroSection;
