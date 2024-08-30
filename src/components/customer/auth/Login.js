import React, { useState } from "react";
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
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  margin: "auto",
  [theme.breakpoints.up("lg")]: { width: 400 },
  [theme.breakpoints.between("md", "lg")]: { width: 360 },
  [theme.breakpoints.between("sm", "md")]: { width: 320 },
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

// const Loader = styled(CircularProgress)(({ theme }) => ({
//   position: "absolute",
//   right: theme.spacing(2),
//   top: "50%",
//   transform: "translateY(-50%)",
//   color: "#fff",
// }));

const ContentContainer = styled(Box)(({ theme }) => ({
  flexDirection: "column",
  marginRight: theme.spacing(38),
  zIndex: 2,
  color: "#fff",
  [theme.breakpoints.down("md")]: { display: "none" },
}));

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/auth/login", data, {
        withCredentials: true,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      
      toast.success("Login successful!", {
        autoClose: 4000,
      });

      navigate("/menu");
    } catch (err) {
      toast.error(err.response?.data?.message || "An unexpected error occurred", {
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
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
              Welcome Back!
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 4, fontFamily: "Outfit, sans-serif" }}
            >
              Log in to access your account and enjoy our services. We have a
              lot in store for you!
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 2, fontFamily: "Outfit, sans-serif" }}
            >
              <strong>Key Features:</strong>
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 1, fontFamily: "Outfit, sans-serif" }}
            >
              • Personalized dashboard
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 1, fontFamily: "Outfit, sans-serif" }}
            >
              • Real-time updates
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 1, fontFamily: "Outfit, sans-serif" }}
            >
              • 24/7 customer support
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
                sx={{ mb: 3, fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "#333" }}
              >
                Login
              </Typography>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: "flex", flexDirection: "column" }}
              >
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
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
                 <StyledButton
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{ backgroundColor: "#ee8417", mt: 3, mb: 2, fontWeight: "bold" }}
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </StyledButton>
                <StyledButton
                  variant="outlined"
                  color="inherit"
                  component={Link}
                  to="/register"
                  sx={{ mb: 2 }}
                >
                  Sign Up
                </StyledButton>
              </Box>
              <Typography align="center" sx={{ mt: 2 }}>
  <Button
    variant="text"
    color="primary"
    onClick={() => navigate('/forgot-password')}
    sx={{ textTransform: 'none', fontFamily: "Outfit, sans-serif" }}
  >
    Forgot Password?
  </Button>
</Typography>
            </FormContainer>
          </motion.div>
        </Container>
      </BackgroundContainer>
      <ToastContainer />
    </>
  );
};

export default LoginPage;