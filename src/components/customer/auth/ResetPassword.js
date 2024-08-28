import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import CustomerNavbar from "../navbar/CustomerNavbar";

// Styled components
const BackgroundContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(to right, #000, #ee8417)",
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: 0,
  left: 0,
  margin: 0,
}));

const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(4),
  borderRadius: "10px",
  width: "100%",
  maxWidth: "400px",
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

const InputField = styled(TextField)({
  marginBottom: "1rem",
  "& .MuiInputBase-input": {
    fontFamily: "Outfit, sans-serif",
  },
  "& .MuiInputLabel-root": {
    fontFamily: "Outfit, sans-serif",
  },
});

const ResetButton = styled(Button)(({ theme }) => ({
  marginTop: "1rem",
  borderRadius: "20px",
  fontFamily: "Outfit, sans-serif",
  fontWeight: "bold",
  textTransform: "none",
  backgroundColor: "#ee8417",
  "&:hover": {
    backgroundColor: "#d76c2d",
  },
}));

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3000/auth/reset-password",
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomerNavbar />
      <BackgroundContainer>
        <FormContainer>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "#000", fontFamily: "Outfit", fontWeight: 700 }}
          >
            Reset Password
          </Typography>
          <Box component="form">
            <InputField
              fullWidth
              label="Old Password"
              variant="outlined"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <InputField
              fullWidth
              label="New Password"
              variant="outlined"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <InputField
              fullWidth
              label="Confirm New Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <ResetButton
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleResetPassword}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Update Password"}
            </ResetButton>
          </Box>
        </FormContainer>
      </BackgroundContainer>
    </>
  );
};

export default ResetPassword;
