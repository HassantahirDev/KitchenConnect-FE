import React, { useState } from "react";
import { Container, Box, Typography, Button, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import OtpInput from "react-otp-input";
import CustomerNavbar from "../navbar/CustomerNavbar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Styled components
const BackgroundContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(to right, #000, #ee8417)",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  position: "relative",
}));

const PatternOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background:
    'url("https://www.toptal.com/designers/subtlepatterns/patterns/dark-tileable.png")',
  opacity: 0.1,
  zIndex: 1,
  backgroundSize: "cover",
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

const OtpVerificationPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { role, email } = location.state || {}; // Retrieve role and email from state

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isExtraLargeScreen = useMediaQuery(theme.breakpoints.between("md", "lg"));
  
  let inputWidth, inputHeight, fontSize;
  
  if (isLargeScreen) {
    inputWidth = "3rem";
    inputHeight = "3rem";
    fontSize = "1.5rem";
  } else if (isExtraLargeScreen) {
    inputWidth = "2.75rem";
    inputHeight = "2.75rem";
    fontSize = "1.375rem";
  } else if (isMediumScreen) {
    inputWidth = "2.5rem";
    inputHeight = "2.5rem";
    fontSize = "1.25rem";
  } else if (isSmallScreen) {
    inputWidth = "2rem";
    inputHeight = "2rem";
    fontSize = "1rem";
  } else {
    inputWidth = "1.5rem";
    inputHeight = "1.5rem";
    fontSize = "0.875rem";
  }
  

  const [otp, setOtp] = useState("");

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  const handleVerify = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/verify-user",
        {
          email: email, // Use the email from state
          otp: otp
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log('response', response.status)
      if (response.status === 201 && role === "HOSTELITE") {
        // Handle successful verification, e.g., navigate to a new page
        navigate('/login'); // Example navigation
      } else if(response.status === 201 && role === "OFFICE_ADMIN") {
        navigate('/complete-registration',{
          state: { email: email }
        }); // Example navigation
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
    }
  };

  return (
    <>
      <CustomerNavbar />
      <BackgroundContainer>
        <PatternOverlay />
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
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
              Verify Your OTP
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 4, fontFamily: "Outfit, sans-serif" }}
            >
              Enter the OTP sent to your email to complete the verification
              process.
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 2, fontFamily: "Outfit, sans-serif" }}
            >
              <strong>Why Verify Your OTP?</strong>
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 1, fontFamily: "Outfit, sans-serif" }}
            >
              • Ensure your email address is valid
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 1, fontFamily: "Outfit, sans-serif" }}
            >
              • Secure your account with an added layer of protection
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 1, fontFamily: "Outfit, sans-serif" }}
            >
              • Complete the sign-up process
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
                OTP Verification
              </Typography>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <OtpInput
                  value={otp}
                  isInputNum={true}
                  onChange={handleOtpChange}
                  numInputs={4}
                  separator={<span style={{ width: "10px" }}></span>}
                  inputStyle={{
                    width: inputWidth,
                    height: inputHeight,
                    margin: "0 0.5rem",
                    fontSize: fontSize,
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    backgroundColor: "#fafafa",
                  }}
                  focusStyle={{
                    border: `2px solid #ee8417`,
                  }}
                  renderInput={(props) => <input {...props} />}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <StyledButton
                    type="button"
                    variant="contained"
                    color="secondary"
                    sx={{
                      backgroundColor: "#ee8417",
                      mt: 3,
                      fontWeight: "bold",
                    }}
                    onClick={handleVerify}
                  >
                    Verify OTP
                  </StyledButton>
                </Box>
              </Box>
            </FormContainer>
          </motion.div>
        </Container>
      </BackgroundContainer>
    </>
  );
};

export default OtpVerificationPage;
