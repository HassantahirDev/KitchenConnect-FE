// src/components/Testimonials.js
import React from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";

// Ensure the font is loaded in your project. Example:
// @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700&display=swap');

const testimonials = [
  {
    name: "John Doe",
    feedback: "The food was amazing and the delivery was super fast!",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg", // Use a link to the image
  },
  {
    name: "Jane Smith",
    feedback: "I love the variety of cuisines available. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg", // Use a link to the image
  },
  {
    name: "Alex Johnson",
    feedback: "Fresh ingredients and delicious meals every time.",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg", // Use a link to the image
  },
];

const CustomCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
  },
}));

const Testimonials = () => {
  return (
    <Box
      sx={{
        py: 8,
        px: 4,
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        fontFamily: "Outfit",
        marginBottom: "-50px",
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: 900, fontFamily: "Outfit" }}
      >
        What Our Customers Say
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CustomCard>
                <CardContent sx={{ textAlign: "center" }}>
                  <Avatar
                    alt={testimonial.name}
                    src={testimonial.avatar}
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 2,
                      mx: "auto",
                      border: "3px solid #eee",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ mb: 1, fontWeight: 500, fontFamily: "Outfit" }}
                  >
                    {testimonial.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontFamily: "Outfit" }}
                  >
                    "{testimonial.feedback}"
                  </Typography>
                </CardContent>
              </CustomCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;
