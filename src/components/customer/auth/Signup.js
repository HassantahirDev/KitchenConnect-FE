// src/pages/SignUpPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { Container, Box, Typography, TextField, Button, Paper, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import CustomerNavbar from '../CustomerNavbar';

// Styled components
const BackgroundContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(to right, #000, #ee8417)',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  position: 'relative',
}));

const PatternOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'url("https://www.toptal.com/designers/subtlepatterns/patterns/dark-tileable.png")',
  opacity: 0.1,
  zIndex: 1,
  backgroundSize: 'cover',
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '100%',
  width: '100%',
  maxWidth: 400,
  zIndex: 2,
  background: '#fff',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  fontFamily: 'Outfit, sans-serif',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#d76c2d', // Darker shade for hover effect
  },
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  marginRight: theme.spacing(38),
  zIndex: 2,
  color: '#fff',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const SignUpPage = () => {
  const [role, setRole] = React.useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSignUp = () => {
    // Handle sign-up logic here
    // On successful sign-up, navigate to the OTP verification page
    navigate('/otp-verification');
  };

  return (
    <>
      <CustomerNavbar />
      <BackgroundContainer>
        <PatternOverlay />
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: '100%',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <ContentContainer>
            <Typography variant="h3" sx={{ mb: 2, fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}>
              Join Us!
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, fontFamily: 'Outfit, sans-serif' }}>
              Sign up to start using our services and become a part of our community!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontFamily: 'Outfit, sans-serif' }}>
              <strong>Why Choose Us?</strong>
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, fontFamily: 'Outfit, sans-serif' }}>
              • Personalized dashboard
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, fontFamily: 'Outfit, sans-serif' }}>
              • Real-time updates
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, fontFamily: 'Outfit, sans-serif' }}>
              • 24/7 customer support
            </Typography>
          </ContentContainer>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%' }}
          >
            <FormContainer elevation={3}>
              <Typography
                variant="h4"
                align="center"
                sx={{
                  mb: 3,
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 700,
                  color: '#333',
                }}
              >
                Sign Up
              </Typography>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <TextField
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  InputProps={{
                    sx: {
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '1rem',
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '1rem',
                    },
                  }}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  InputProps={{
                    sx: {
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '1rem',
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '1rem',
                    },
                  }}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  InputProps={{
                    sx: {
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '1rem',
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '1rem',
                    },
                  }}
                />
                <FormControl variant="outlined" margin="normal" fullWidth required>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={role}
                    onChange={handleRoleChange}
                    label="Role"
                    InputProps={{
                      sx: {
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: '1rem',
                      },
                    }}
                    SelectDisplayProps={{
                      sx: {
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: '1rem',
                      },
                    }}
                  >
                    <MenuItem value="Hostelite">Hostelite</MenuItem>
                    <MenuItem value="Office Admin">Office Admin</MenuItem>
                  </Select>
                </FormControl>
                <StyledButton
                  type="button"
                  variant="contained"
                  color="secondary"
                  sx={{
                    backgroundColor: '#ee8417',
                    mt: 3,
                    mb: 2,
                    fontWeight: 'bold',
                  }}
                  onClick={handleSignUp} // Handle sign-up click
                >
                  Sign Up
                </StyledButton>
                <StyledButton
                  variant="outlined"
                  color="inherit"
                  sx={{
                    mb: 2,
                  }}
                >
                  Login
                </StyledButton>
              </Box>
            </FormContainer>
          </motion.div>
        </Container>
      </BackgroundContainer>
    </>
  );
};

export default SignUpPage;
