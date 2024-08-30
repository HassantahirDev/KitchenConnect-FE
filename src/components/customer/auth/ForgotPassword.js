import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
 
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// Styled components, same as the ones used in LoginPage
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

const StyledButton = styled(Button)(({ theme, loading }) => ({
  borderRadius: "20px",
  fontFamily: "Outfit, sans-serif",
  textTransform: "none",
  backgroundColor: loading ? "#d76c2d" : "#ee8417",
  "&:hover": { backgroundColor: "#d76c2d" },
}));

const ForgotPasswordPage = () => {
    const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:3000/auth/forgot-password", data);
      toast.success("Reset link sent to your email!", {
        autoClose: 4000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (err) {
      toast.error(err.response?.data?.message || "An unexpected error occurred", {
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundContainer>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        <FormContainer elevation={3}>
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 3, fontFamily: "Outfit, sans-serif", fontWeight: 700, color: "#333" }}
          >
            Forgot Password
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
            <StyledButton
              type="submit"
              variant="contained"
              color="secondary"
              loading={loading}
              sx={{ mt: 3, mb: 2, fontWeight: "bold"}}
            >
              {loading ? "Sending..." : "Send Reset Link"} 
            </StyledButton>
          </Box>
        </FormContainer>
      </Container>
      <ToastContainer />
    </BackgroundContainer>
  );
};

export default ForgotPasswordPage;
