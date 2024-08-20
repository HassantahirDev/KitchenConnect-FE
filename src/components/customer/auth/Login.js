// src/pages/LoginPage.js
import React from 'react';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import CustomerNavbar from '../CustomerNavbar';

// Styled components
const BackgroundContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(to right, #000, #ee8417)',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  padding: '20px', 
  position: 'relative',
}));

// const PatternOverlay = styled(Box)(({ theme }) => ({
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '100%',
//   background: 'url("https://www.toptal.com/designers/subtlepatterns/patterns/dark-tileable.png")',
//   opacity: 0.1,
//   zIndex: 1,
//   backgroundSize: 'cover',
// }));
const FormContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    width: '100%', // Default width for all screens
    zIndex: 2,
    background: '#fff',
    marginLeft: 'auto', // Center horizontally
    marginRight: 'auto', // Center horizontally
    [theme.breakpoints.up('lg')]: {
      width: 400, // Width for large screens
      marginLeft: 0, // Reset margins for large screens
      marginRight: 0, // Reset margins for large screens
    },
    [theme.breakpoints.between('md', 'lg')]: {
      width: 360, // Width for medium screens
    },
    [theme.breakpoints.between('sm', 'md')] : {
      width: 320, // Width for small-medium screens
    },
    [theme.breakpoints.down('sm')] : {
      padding: theme.spacing(3),
      width: 260, // Width for small screens
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

const Image = styled('img')({
  maxWidth: '100%',
  height: 'auto',
  borderRadius: '8px',
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <>
      <CustomerNavbar />
      <BackgroundContainer>
       
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
              Welcome Back!
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, fontFamily: 'Outfit, sans-serif' }}>
              Log in to access your account and enjoy our services. We have a lot in store for you!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontFamily: 'Outfit, sans-serif' }}>
              <strong>Key Features:</strong>
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
                Login
              </Typography>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <TextField
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address',
                    },
                  })}
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
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long',
                    },
                  })}
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
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
                <StyledButton
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{
                    backgroundColor: '#ee8417',
                    mt: 3,
                    mb: 2,
                    fontWeight: 'bold',
                  }}
                >
                  Login
                </StyledButton>
                <StyledButton
                  variant="outlined"
                  color="inherit"
                  sx={{
                    mb: 2,
                  }}
                >
                  Sign Up
                </StyledButton>
              </Box>
            </FormContainer>
          </motion.div>
        </Container>
      </BackgroundContainer>
    </>
  );
};

export default LoginPage;
