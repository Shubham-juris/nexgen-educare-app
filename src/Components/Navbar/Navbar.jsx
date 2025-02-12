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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Navbar/Logo.webp';

// Global Link Style
const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'red',
});

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

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0); // Fixed missing state update

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY); // Updating the scrollY state

      // Hide navbar on scroll down, show on scroll up
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY <= 50);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuToggle = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleSearchBar = () => setSearchBarOpen(!searchBarOpen);

  return (
    <Box sx={{ overflowY: 'hidden' }}>
      {/* Fixed and animated AppBar */}
      <AppBar
        position='fixed'
        sx={{
          backgroundColor:
            scrollY > 50
              ? 'rgba(243, 236, 236, 0.68)'
              : 'rgba(255, 255, 255, 0)',
          backdropFilter: 'blur(0px)',
          color: 'red',
          boxShadow: scrollY > 50 ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none',
          transition: 'transform 0.3s ease, background-color 0.3s ease',
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        }}
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
            {/* Left: Logo */}
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <StyledLink to='/'>
                <img
                  src={Logo}
                  alt='Logo'
                  style={{
                    height: '70px',
                    width: 'auto',
                    cursor: 'pointer',
                    marginTop: '7%',
                    // marginLeft: '-70%',
                  }}
                />
              </StyledLink>

              {/* Center: Navigation Links */}
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  gap: 6,
                  marginLeft: '100px',
                }}
              >
                {['Courses', 'About Us', 'Contact Us'].map((text) => (
                  <Button
                    key={text}
                    sx={{
                      position: 'relative',
                      color: 'red',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
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
                      '&:hover:after': { transform: 'scaleX(1)' },
                    }}
                    component={StyledLink}
                    to={`/${text.replace(' ', '').toLowerCase()}`}
                  >
                    {text}
                  </Button>
                ))}
              </Box>
            </Box>

            {/* Right: Search and Buttons */}
            <Box
              sx={{ display: 'flex', alignItems: 'center', marginRight: '5px' }}
            >
              {searchBarOpen ? (
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <Input placeholder='Search...' />
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

            {/* Login/Sign Up Buttons */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              <Button
                sx={{ color: 'red', fontSize: '1.1rem', fontWeight: 'bold' }}
                component={StyledLink}
                to='/login'
              >
                Login
              </Button>
              <Button
                sx={{ color: 'red', fontSize: '1.1rem', fontWeight: 'bold' }}
                component={StyledLink}
                to='/adminlogin'
              >
                Admin Login
              </Button>
            </Box>

            {/* Mobile Menu Icon */}
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

        {/* Mobile Drawer */}
        <Drawer
          anchor='right'
          open={mobileMenuOpen}
          onClose={closeMobileMenu}
          sx={{
            '& .MuiDrawer-paper': { width: '250px', padding: '16px' },
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
            {['Courses', 'About Us', 'Contact Us'].map((text) => (
              <Button
                key={text}
                onClick={closeMobileMenu}
                component={StyledLink}
                to={`/${text.replace(' ', '').toLowerCase()}`}
                sx={{ color: 'red' }}
              >
                {text}
              </Button>
            ))}
            <Button
              sx={{ color: 'red' }}
              onClick={closeMobileMenu}
              component={StyledLink}
              to='/login'
            >
              Login
            </Button>
            <Button
              sx={{ color: 'red' }}
              onClick={closeMobileMenu}
              component={StyledLink}
              to='/adminlogin'
            >
              Admin Login
            </Button>
          </Box>
        </Drawer>
      </AppBar>
    </Box>
  );
};

export default Navbar;
