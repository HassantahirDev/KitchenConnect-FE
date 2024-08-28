import React, { useState, useEffect } from 'react';
import CustomerNavbar from '../navbar/CustomerNavbar';
import HeroSection from '../landing-page/HeroSection';
import FeaturesSection from '../landing-page/FeaturesSection';
import { CssBaseline, Container, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import Testimonials from '../landing-page/Testimonials';
import Footer from '../footer/Footer';
import { styled } from '@mui/system';

// Desired location range for validation
const desiredLocationRange = { lat: 38.5497, lng: 79.3436, radius: 20 }; // Example coordinates and radius in km

const isLocationInRange = (lat, lng) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const earthRadius = 6371; // Radius of Earth in km

  const dLat = toRad(lat - desiredLocationRange.lat);
  const dLng = toRad(lng - desiredLocationRange.lng);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(desiredLocationRange.lat)) *
    Math.cos(toRad(lat)) *
    Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;

  return distance <= desiredLocationRange.radius;
};

// Styled components for the dialog
const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '30px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    padding: '24px',
    backgroundColor: '#ffffff',
    [theme.breakpoints.down('sm')]: {
      padding: '16px',
    },
  },
}));

const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 600,
  color: '#ee8417',
  marginBottom: '16px',
  textAlign: 'center',
}));

const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  textAlign: 'center',
  color: '#333',
}));

const DialogActionsStyled = styled(DialogActions)(({ theme }) => ({
  justifyContent: 'center',
  marginTop: '24px',
}));

const LandingPage = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [locationStatus, setLocationStatus] = useState(null);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            if (isLocationInRange(latitude, longitude)) {
              setLocationStatus('within-range');
            } else {
              setLocationStatus('out-of-range');
              setPopupMessage('We are not operating in this area yet. Coming soon!');
              setOpenPopup(true);
            }
          },
          (error) => {
            console.error('Error getting location', error);
            setLocationStatus('error');
            setPopupMessage('We are only operating in Johar Town. Thank you for understanding.');
            setOpenPopup(true);
          }
        );
      } else {
        setLocationStatus('error');
        setPopupMessage('We are only operating in Johar Town. Thank you for understanding.');
        setOpenPopup(true);
      }
    };

    getUserLocation();
  }, []);

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <div>
      <CssBaseline />
      <CustomerNavbar />
      <HeroSection />
      <Container maxWidth="lg">
        <FeaturesSection />
      </Container>
      <Testimonials />
      <Footer />

      <CustomDialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitleStyled sx={{ fontFamily: "Outfit" }}>Location Information</DialogTitleStyled>
        <DialogContentStyled>
          <Typography variant="body1" sx={{ fontFamily: "Outfit" }}>
            {popupMessage}
          </Typography>
        </DialogContentStyled>
        <DialogActionsStyled>
          <Button onClick={handleClosePopup} variant="contained" style={{ backgroundColor: "#ee8417", borderRadius: "16px", fontFamily: "Outfit" }}>
            Close
          </Button>
        </DialogActionsStyled>
      </CustomDialog>
    </div>
  );
};

export default LandingPage;
