// src/components/Hero.js
import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        marginTop: "50px",
        background: `url('https://images.unsplash.com/photo-1614886332795-6ef15400ee2d?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center/cover no-repeat`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        color: "#fff",
      }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{ mb: 3, fontWeight: "bold", fontFamily: "Outfit" }}
        >
          Delicious Food Delivered to You!
        </Typography>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ee8417",
            borderRadius: "30px",
            color: "#fff",
            textTransform: "none",
            fontFamily: "Outfit",
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            "&:hover": {
              backgroundColor: "#ee7900", // Slightly darker shade for hover
            },
          }}
        >
          Order Now
        </Button>
      </motion.div>
    </Box>
  );
};

export default HeroSection;
