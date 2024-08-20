// src/App.js
import React from 'react';
import CustomerNavbar from './CustomerNavbar';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import { CssBaseline, Container } from '@mui/material';
import Testimonials from './Testimonials';
import Footer from './Footer';

function LandingPage() {
  return (
    <div>
      <CssBaseline />
      <CustomerNavbar />
      <HeroSection />
      <Container maxWidth="lg">
        <FeaturesSection />
        
      </Container>
      <Testimonials/>
      <Footer/>
    </div>
  );
}

export default LandingPage;
