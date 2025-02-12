import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  InputBase,
  Drawer,
  Divider,
  Typography,
  keyframes,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom'; // Ensure Link is imported correctly
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles
import Logo from '../../assets/Navbar/Logo.webp';

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

const Search = styled('div')({
  position: 'relative',
  borderRadius: '4px',
  backgroundColor: '#f1f1f1',
  marginLeft: '16px',
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  alignItems: 'center',
});

const SearchIconWrapper = styled('div')({
  position: 'absolute',
  pointerEvents: 'none',
  left: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
});

const Input = styled(InputBase)({
  paddingLeft: '30px',
  width: '100%',
});

const NavbarAndHero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1500, // Animation duration
      offset: 50, // Offset from the top
    });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const toggleSearchBar = () => {
    setSearchBarOpen(!searchBarOpen);
  };

  return (
    <Box sx={{ overflowY: 'hidden', height: '100vh' }}>
      {/* Navbar */}
      <AppBar
        position='sticky'
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(1500px)',
          color: 'red',
          overflowX: 'hidden',
        }}
        data-aos='fade-down' // AOS animation applied to the entire navbar
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '1200px',
              width: '100%',
            }}
          >
            {/* Logo and Links */}
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <img
                src={Logo}
                alt='Logo'
                style={{ height: '40px', width: 'auto', cursor: 'pointer' }}
              />
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  gap: 6,
                  marginLeft: '160px',
                }}
              >
                {['Courses', 'About Us', 'Contact Us'].map((text) => (
                  <Button
                    key={text}
                    color='inherit'
                    sx={{
                      position: 'relative',
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        width: '100%',
                        height: '4px',
                        bottom: 0,
                        left: 0,
                        backgroundColor: 'red',
                        transform: 'scaleX(0)',
                        transformOrigin: 'center',
                        transition: 'transform 0.3s ease',
                      },
                      '&:hover:after': {
                        transform: 'scaleX(1)',
                      },
                    }}
                    component={Link} // Use Link for routing
                    to={`/${text.replace(' ', '').toLowerCase()}`} // Dynamic routing based on button text
                  >
                    {text}
                  </Button>
                ))}
              </Box>
            </Box>

            {/* Search Icon and Search Bar */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '16px',
              }}
            >
              {searchBarOpen ? (
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <Input
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <IconButton color='inherit' onClick={toggleSearchBar}>
                    <CloseIcon />
                  </IconButton>
                </Search>
              ) : (
                <IconButton color='inherit' onClick={toggleSearchBar}>
                  <SearchIcon />
                </IconButton>
              )}
            </Box>

            {/* Login and Signup Buttons (Desktop) */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              <Button color='inherit' component={Link} to='/login'>
                Login
              </Button>
              <Button color='inherit' component={Link} to='/signup'>
                Admin Login
              </Button>
            </Box>

            {/* Mobile Menu Toggle Button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                color='inherit'
                onClick={handleMobileMenuToggle}
                aria-label='menu'
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>
          </Box>
        </Toolbar>

        {/* Mobile Menu Drawer */}
        <Drawer
          anchor='right'
          open={mobileMenuOpen}
          onClose={closeMobileMenu}
          sx={{
            '& .MuiDrawer-paper': {
              width: '250px',
              padding: '16px',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant='h6'>Menu</Typography>
            <IconButton onClick={closeMobileMenu}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button onClick={closeMobileMenu} component={Link} to='/courses'>
              Courses
            </Button>
            <Button onClick={closeMobileMenu} component={Link} to='/aboutus'>
              About Us
            </Button>
            <Button onClick={closeMobileMenu} component={Link} to='/contactus'>
              Contact Us
            </Button>
          </Box>
        </Drawer>
      </AppBar>

      {/* Hero Section */}
    </Box>
  );
};

export default NavbarAndHero;
