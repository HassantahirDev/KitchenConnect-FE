import React from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import CustomerNavbar from "../navbar/CustomerNavbar";
import { useState } from "react";
import axios from "axios";

// Styled components
const BackgroundContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(to right, #000, #ee8417)",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  padding: "20px",
  position: "relative",
  overflow: "hidden",
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: "100%",
  zIndex: 2,
  background: "#fff",
  marginLeft: "auto",
  marginRight: "auto",
  [theme.breakpoints.up("lg")]: {
    width: 400,
    marginLeft: 0,
    marginRight: 0,
  },
  [theme.breakpoints.between("md", "lg")]: {
    width: 360,
  },
  [theme.breakpoints.between("sm", "md")]: {
    width: 320,
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
    width: 260,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "20px",
  fontFamily: "Outfit, sans-serif",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#d76c2d",
  },
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  flexDirection: "column",
  marginRight: theme.spacing(38),
  zIndex: 2,
  color: "#fff",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  color: "#fff",
}));

const ContactUsPage = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setSuccessMessage("");
      const response = await axios.post(
        "http://192.168.1.5:3000/contact-us",
        data,
        {
          withCredentials: true,
        }
      );

      console.log("Response:", response);
      setSuccessMessage("Your message has been sent successfully!");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      <CustomerNavbar />
      <BackgroundContainer>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            height: "100%",
            position: "relative",
            zIndex: 2,
          }}
        >
          <ContentContainer>
            <Typography
              variant="h3"
              sx={{ mb: 2, fontFamily: "Outfit, sans-serif", fontWeight: 700 }}
            >
              Get in Touch!
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 4, fontFamily: "Outfit, sans-serif" }}
            >
              We're here to help. Reach out to us for any queries or support.
            </Typography>
            <IconWrapper>
              {/* You can replace these with any suitable icons */}
              <Typography
                variant="body1"
                sx={{ mb: 1, fontFamily: "Outfit, sans-serif" }}
              >
                • 📧 Email: support@yourcompany.com
              </Typography>
            </IconWrapper>
            <IconWrapper>
              <Typography
                variant="body1"
                sx={{ mb: 1, fontFamily: "Outfit, sans-serif" }}
              >
                • 📞 Phone: +123 456 7890
              </Typography>
            </IconWrapper>
            <IconWrapper>
              <Typography
                variant="body1"
                sx={{ mb: 1, fontFamily: "Outfit, sans-serif" }}
              >
                • 🕒 Mon-Fri: 9 AM - 6 PM
              </Typography>
            </IconWrapper>
          </ContentContainer>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%" }}
          >
            <FormContainer elevation={3}>
              <Typography
                variant="h4"
                align="center"
                sx={{
                  mb: 3,
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 700,
                  color: "#333",
                }}
              >
                Contact Us
              </Typography>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <TextField
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  {...register("name", {
                    required: "Name is required",
                  })}
                  InputProps={{
                    sx: {
                      fontFamily: "Outfit, sans-serif",
                      fontSize: "1rem",
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontFamily: "Outfit, sans-serif",
                      fontSize: "1rem",
                    },
                  }}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  InputProps={{
                    sx: {
                      fontFamily: "Outfit, sans-serif",
                      fontSize: "1rem",
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontFamily: "Outfit, sans-serif",
                      fontSize: "1rem",
                    },
                  }}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  label="Message"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  multiline
                  rows={4}
                  required
                  {...register("message", {
                    required: "Message is required",
                  })}
                  InputProps={{
                    sx: {
                      fontFamily: "Outfit, sans-serif",
                      fontSize: "1rem",
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontFamily: "Outfit, sans-serif",
                      fontSize: "1rem",
                    },
                  }}
                  error={!!errors.message}
                  helperText={errors.message?.message}
                />
                <StyledButton
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{
                    backgroundColor: "#ee8417",
                    mt: 3,
                    mb: 2,
                    fontWeight: "bold",
                  }}
                >
                  Send Message
                </StyledButton>
                {successMessage && (
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 2,
                      fontFamily: "Outfit, sans-serif",
                      color: "green",
                    }}
                  >
                    {successMessage}
                  </Typography>
                )}
              </Box>
            </FormContainer>
          </motion.div>
        </Container>
      </BackgroundContainer>
    </>
  );
};

export default ContactUsPage;
