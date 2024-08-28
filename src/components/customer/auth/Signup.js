import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import CustomerNavbar from "../navbar/CustomerNavbar";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";

// Styled components
const BackgroundContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(to right, #000, #ee8417)",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  position: "relative",
}));

const PatternOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: 'url("https://www.toptal.com/designers/subtlepatterns/patterns/dark-tileable.png")',
  opacity: 0.1,
  zIndex: 1,
  backgroundSize: "cover",
});

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: "100%",
  zIndex: 2,
  background: "#fff",
  margin: "auto",
  [theme.breakpoints.up("lg")]: {
    width: 400,
    margin: 0,
  },
  [theme.breakpoints.between("md", "lg")]: {
    width: 360,
    marginTop: 110,
  },
  [theme.breakpoints.between("sm", "md")]: {
    width: 320,
    marginTop: 110,
  },
  [theme.breakpoints.down("sm")]: {
    width: 230,
    padding: theme.spacing(3),
    marginTop: 110,
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

// Validation schema using yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  role: yup.string().required("Role is required"),
});

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/sign-up",
        {
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role.toUpperCase(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        navigate("/otp-verification", {
          state: { role: data.role, email: data.email },
        });
      } else {
        console.error("Sign-up failed:", response);
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    } finally {
      setLoading(false);
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
            justifyContent: "flex-end",
            alignItems: "center",
            height: "100%",
            position: "relative",
            zIndex: 2,
          }}
        >
          <ContentContainer>
            <Typography variant="h3" sx={{ mb: 2, fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>
              Join Us!
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, fontFamily: "Outfit, sans-serif" }}>
              Sign up to start using our services and become a part of our community!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontFamily: "Outfit, sans-serif" }}>
              <strong>Why Choose Us?</strong>
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, fontFamily: "Outfit, sans-serif" }}>
              • Personalized dashboard
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, fontFamily: "Outfit, sans-serif" }}>
              • Real-time updates
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, fontFamily: "Outfit, sans-serif" }}>
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
                Sign Up
              </Typography>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      error={!!errors.name}
                      helperText={errors.name?.message}
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
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      error={!!errors.email}
                      helperText={errors.email?.message}
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
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      type="password"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      error={!!errors.password}
                      helperText={errors.password?.message}
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
                    />
                  )}
                />
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      error={!!errors.role}
                    >
                      <InputLabel>Role</InputLabel>
                      <Select
                        {...field}
                        label="Role"
                        InputProps={{
                          sx: {
                            fontFamily: "Outfit, sans-serif",
                            fontSize: "1rem",
                          },
                        }}
                      >
                        <MenuItem value="HOSTELITE">Hostelite</MenuItem>
                        <MenuItem value="OFFICE_ADMIN">Office Admin</MenuItem>
                      </Select>
                      <FormHelperText>{errors.role?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
                <StyledButton
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{ backgroundColor: "#ee8417", mt: 3, mb: 2, fontWeight: "bold" }}
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </StyledButton>
                <StyledButton
                  variant="outlined"
                  color="inherit"
                  sx={{ mb: 2 }}
                >
                  Login
                </StyledButton>
              </Box>
            </FormContainer>
          </motion.div>
        </Container>
      </BackgroundContainer>
    </>
  );
};

export default SignUpPage;
