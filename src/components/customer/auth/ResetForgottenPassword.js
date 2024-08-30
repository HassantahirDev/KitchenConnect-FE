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
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Reuse Styled components
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

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { token } = useParams();  // Get the token from the URL

  const onSubmit = async (data) => {
    try {
      setLoading(true);
  
      // Include the token in the request body along with the form data
      const payload = {
        ...data, // Spread the form data (e.g., newPassword, confirmPassword)
        token,   // Add the token to the body
      };
  
      await axios.post("http://localhost:3000/auth/reset-forgotten-password", payload);
  
      toast.success("Password reset successful!", {
        autoClose: 4000,
      });
      navigate("/login");
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
            Reset Password
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <TextField
              label="New Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === watch("newPassword") || "Passwords do not match",
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
            <StyledButton
              type="submit"
              variant="contained"
              color="secondary"
              loading={loading}
              sx={{ mt: 3, mb: 2, fontWeight: "bold" }}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </StyledButton>
          </Box>
        </FormContainer>
      </Container>
      <ToastContainer />
    </BackgroundContainer>
  );
};

export default ResetPasswordPage;
