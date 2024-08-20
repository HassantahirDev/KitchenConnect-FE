// src/components/Features.js
import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";

const features = [
  {
    title: "Quick Delivery",
    description: "Get your food delivered in less than 30 minutes.",
    image:
      "https://thumbs.dreamstime.com/b/delivery-motorcycle-scooter-fire-fast-delivery-concept-delivery-motorcycle-scooter-fire-fast-delivery-concept-184933449.jpg",
  },
  {
    title: "Fresh Ingredients",
    description: "We use only the freshest ingredients.",
    image:
      "https://larosachicken.com/blogs/b_92266The-Importance-of-Fresh-Ingredients-in-Food-Preparation.jpg",
  },
  {
    title: "Wide Variety",
    description: "A wide variety of cuisines to choose from.",
    image:
      "https://media.istockphoto.com/id/1058241232/photo/various-plates-of-food-isolated-on-white-background-top-view.jpg?s=612x612&w=0&k=20&c=eq75hY1Z7R-TT7SP0fShF_GBGSZBEUwhIhE7bAHzT5M=",
  },
];

const FeaturesSection = () => {
  return (
    <Box sx={{ py: 8, px: 4, textAlign: "center" }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: "bold", fontFamily: "Outfit" }}
      >
        Why Choose Us?
      </Typography>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ mb: 2 }}>
                <img
                  src={feature.image}
                  alt={feature.title}
                  style={{ width: "100px", marginBottom: "16px" }}
                />
              </Box>
              <Typography variant="h6" sx={{ fontFamily: "Outfit" }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: "Outfit" }}>
                {feature.description}
              </Typography>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturesSection;
