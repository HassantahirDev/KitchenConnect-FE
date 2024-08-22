// src/components/Footer.js
import React from "react";
import { Box, Grid, Typography, Link, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const footerLinks = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Blog"],
  },
  {
    title: "Support",
    links: ["Contact Us", "FAQs", "Help Center"],
  },
  {
    title: "Legal",
    links: ["Terms of Service", "Privacy Policy", "Cookies Policy"],
  },
];

const socialIcons = [
  { icon: <FacebookIcon />, url: "https://facebook.com" },
  { icon: <TwitterIcon />, url: "https://twitter.com" },
  { icon: <InstagramIcon />, url: "https://instagram.com" },
  { icon: <LinkedInIcon />, url: "https://linkedin.com" },
];

const Footer = () => {
  return (
    <Box
      sx={{
        py: 6,
        position: 'relative',
        px: 4,
        backgroundColor: "#ee8417",
        color: "#fff",
        textAlign: "center",
        marginTop: "50px",
        zIndex: '1100',
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {footerLinks.map((section, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: "Outfit" }}>
              {section.title}
            </Typography>
            {section.links.map((link, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="#"
                  underline="none"
                  sx={{
                    color: "#fff",
                    display: "block",
                    fontFamily: "Outfit",
                    mb: 1,
                    "&:hover": { color: "black" },
                  }}
                >
                  {link}
                </Link>
              </motion.div>
            ))}
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontFamily: "Outfit" }}>
          Follow Us
        </Typography>
        <Box>
          {socialIcons.map((social, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ display: "inline-block", margin: "0 10px" }}
            >
              <IconButton
                component="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#fff" }}
              >
                {social.icon}
              </IconButton>
            </motion.div>
          ))}
        </Box>
      </Box>

      <Typography sx={{ mt: 4, fontSize: "0.875rem", fontFamily: "Outfit" }}>
        © 2024 KitchenConnect. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
