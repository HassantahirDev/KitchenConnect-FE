// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Hidden } from '@mui/material';
import { Home, Info, ContactMail, Login, PersonAdd } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const CustomerNavbar = () => {
  const StyledAppBar = styled(AppBar)(({ theme }) => ({
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ee8417',
  }));

  return (
    <StyledAppBar position="fixed">
      <Toolbar sx={{ height: 80 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Outfit', fontWeight: 700 }}>
              KitchenConnect
            </Typography>
            <Box sx={{ flexGrow: 2, display: 'flex', justifyContent: 'center' }}>
              {/* Hide these buttons on mobile */}
              <Hidden smDown>
                <Button color="inherit" startIcon={<Home />} sx={{ fontFamily: 'Outfit' }}>
                  Home
                </Button>
                <Button color="inherit" startIcon={<Info />} sx={{ fontFamily: 'Outfit' }}>
                  About
                </Button>
                <Button color="inherit" startIcon={<ContactMail />} sx={{ fontFamily: 'Outfit' }}>
                  Contact
                </Button>
              </Hidden>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Always show Login button */}
              <Button color="inherit" startIcon={<Login />} component={Link} to="/login" sx={{ mr: 1, fontFamily: 'Outfit' }}>
                Login
              </Button>
              <Button
                variant="contained"
                startIcon={<PersonAdd />}
                component={Link} to="/register"
                sx={{
                  backgroundColor: '#fff',
                  fontFamily: 'Outfit',
                  borderRadius: '20px',
                  color: '#000',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </StyledAppBar>
  );
};

export default CustomerNavbar;
