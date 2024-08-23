// src/App.js
import React from "react";
import CustomerNavbar from "../navbar/CustomerNavbar";
import HeroSection from "../landing-page/HeroSection";
import FeaturesSection from "../landing-page/FeaturesSection";
import { CssBaseline, Container } from "@mui/material";
import Testimonials from "../landing-page/Testimonials";
import Footer from "../footer/Footer";

function LandingPage() {
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
    </div>
  );
}

export default LandingPage;
