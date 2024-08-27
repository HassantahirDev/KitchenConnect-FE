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
import { useNavigate, useLocation } from "react-router-dom";

// Styled components
const BackgroundContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(to right, #000, #ee8417)",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  padding: "20px",
  position: "relative",
  overflow: "hidden", // Prevent horizontal scrolling
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: "100%", // Default width for all screens
  zIndex: 2,
  background: "#fff",
  marginLeft: "auto", // Center horizontally
  marginRight: "auto", // Center horizontally
  [theme.breakpoints.up("lg")]: {
    width: 400, // Width for large screens
    marginLeft: 0, // Reset margins for large screens
    marginRight: 0, // Reset margins for large screens
  },
  [theme.breakpoints.between("md", "lg")]: {
    width: 360, // Width for medium screens
  },
  [theme.breakpoints.between("sm", "md")]: {
    width: 320, // Width for small-medium screens
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
    width: 260, // Width for small screens
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "20px",
  fontFamily: "Outfit, sans-serif",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#d76c2d", // Darker shade for hover effect
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

// New styled component for the circle
const PatternCircle = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  right: 0,
  width: 350, // Adjusted width
  height: 350, // Adjusted height
  borderRadius: "50%",
  border: "50px solid #fff", // Adjusted border thickness
  background: "transparent",
  transform: "translate(50%, 50%)", // Adjusted to ensure part of the circle is visible
  zIndex: 1, // Ensure it is below other content
}));

const CompleteVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {  email } = location.state || {}; 
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setError("");
      const response = await axios.post(
        "https://192.168.1.5:3000/auth/complete-sign-up",
        { ...data, email }, // Include email in the data
        {
          withCredentials: true, // Ensure cookies are sent
        }
      );

      if (response.status === 201) {
        navigate("/login");
      } else {
        setError(response.data.message);
      }
      // Redirect to the dashboard or another protected route
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
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
              Almost There!
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 4, fontFamily: "Outfit, sans-serif" }}
            >
              You’re just one step away from completing your sign-up. Please
              provide your company name and the number of employees to finalize
              your registration.
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 2, fontFamily: "Outfit, sans-serif" }}
            >
              <strong>Next Steps:</strong>
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 1, fontFamily: "Outfit, sans-serif" }}
            >
              • Enter your company name
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 1, fontFamily: "Outfit, sans-serif" }}
            >
              • Specify the number of employees in your company
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 1, fontFamily: "Outfit, sans-serif" }}
            >
              • Complete your registration to start enjoying our services
            </Typography>
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
                Complete Your Signup
              </Typography>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)} // Use handleSubmit with onSubmit function
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <TextField
                  label="Company Name"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  {...register("companyName", {
                    required: "Company Name is required",
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
                  error={!!errors.companyName}
                  helperText={errors.companyName?.message}
                />
                <TextField
                  label="Number of Employees"
                  type="number"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  {...register("numberOfEmployees", {
                    required: "Number of Employees is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Please enter a valid number",
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
                  error={!!errors.numberOfEmployees}
                  helperText={errors.numberOfEmployees?.message}
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
                  Complete Sign Up
                </StyledButton>
              </Box>
            </FormContainer>
          </motion.div>
        </Container>
        {/* Add the PatternCircle component */}
        {/* <PatternCircle /> */}
      </BackgroundContainer>
    </>
  );
};

export default CompleteVerification;
