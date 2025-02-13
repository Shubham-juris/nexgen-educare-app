import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
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
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { styled } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Navbar/Logo.png';

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'red',
});

const Search = styled('div')({
  position: 'relative',
  borderRadius: '4px',
  backgroundColor: 'red',
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  alignItems: 'center',
  padding: '5px 10px',
});

const SearchIconWrapper = styled('div')({
  position: 'absolute',
  left: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: 'white',
});

const Input = styled(InputBase)({
  paddingLeft: '30px',
  width: '100%',
  color: 'white',
});

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleMobileMenuToggle = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleSearchBar = () => setSearchBarOpen(!searchBarOpen);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter') {
      navigate(`/search?q=${searchQuery}`);
      setSearchBarOpen(false);
    }
  };

  return (
    <AppBar
      position='fixed'
      sx={{ backgroundColor: 'rgba(243, 236, 236, 0.95)', boxShadow: 'none' }}
      data-aos='fade-down' // Apply animation to Navbar
    >
      <Container maxWidth='lg'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo */}
          <StyledLink to='/'>
            <img
              src={Logo}
              alt='Logo'
              style={{ height: '60px', width: 'auto' }}
              data-aos='fade-right' // Apply animation to Logo
            />
          </StyledLink>

          {/* Navigation Links - Desktop */}
          <Box
            sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}
            data-aos='fade-left'
          >
            {['Courses', 'About Us', 'Contact Us'].map((text) => (
              <Button
                key={text}
                sx={{
                  color: 'red',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  '&:hover': { textDecoration: 'underline' },
                }}
                component={StyledLink}
                to={`/${text.replace(' ', '').toLowerCase()}`}
              >
                {text}
              </Button>
            ))}
            <Button
              sx={{
                color: 'red',
                fontSize: '1rem',
                fontWeight: 'bold',
                '&:hover': { textDecoration: 'underline' },
              }}
              component={StyledLink}
              to='/login'
            >
              Login
            </Button>
            <Button
              sx={{
                color: 'red',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontWeight: 'bold',
                '&:hover': { textDecoration: 'underline' },
              }}
              component={StyledLink}
              to='/adminlogin'
            >
              <AdminPanelSettingsIcon sx={{ color: 'red' }} /> Admin Login
            </Button>
          </Box>

          {/* Search Bar & Mobile Menu Toggle */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {searchBarOpen ? (
              <Search data-aos='zoom-in'>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <Input
                  placeholder='Search...'
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchSubmit}
                  autoFocus
                />
                <IconButton color='inherit' onClick={toggleSearchBar}>
                  <CloseIcon sx={{ color: 'white' }} />
                </IconButton>
              </Search>
            ) : (
              <IconButton color='inherit' onClick={toggleSearchBar}>
                <SearchIcon sx={{ color: 'red' }} />
              </IconButton>
            )}

            {/* Mobile Menu Button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton color='inherit' onClick={handleMobileMenuToggle}>
                {mobileMenuOpen ? (
                  <CloseIcon sx={{ color: 'red' }} />
                ) : (
                  <MenuIcon sx={{ color: 'red' }} />
                )}
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer anchor='right' open={mobileMenuOpen} onClose={closeMobileMenu}>
        <Box
          sx={{
            width: 250,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
          data-aos='fade-left'
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
              <CloseIcon sx={{ color: 'red' }} />
            </IconButton>
          </Box>
          <Divider />
          {['Courses', 'About Us', 'Contact Us'].map((text) => (
            <Button
              key={text}
              onClick={closeMobileMenu}
              component={StyledLink}
              to={`/${text.replace(' ', '').toLowerCase()}`}
              sx={{ color: 'red', fontSize: '1rem' }}
            >
              {text}
            </Button>
          ))}
          <Button
            sx={{ color: 'red', fontSize: '1rem' }}
            onClick={closeMobileMenu}
            component={StyledLink}
            to='/login'
          >
            Login
          </Button>
          <Button
            sx={{
              color: 'red',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
            onClick={closeMobileMenu}
            component={StyledLink}
            to='/adminlogin'
          >
            <AdminPanelSettingsIcon sx={{ color: 'red' }} /> Admin Login
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
