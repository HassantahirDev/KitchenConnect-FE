import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Avatar, TextField, Button, Grid, CircularProgress, Switch, FormControlLabel, Paper, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { CameraAlt, Lock, Cancel, Autorenew } from "@mui/icons-material";
import CustomerNavbar from "../navbar/CustomerNavbar";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

// Styled components
const BackgroundContainer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up("lg")]: {
        marginTop: 80,
       
      },
      [theme.breakpoints.between("md", "lg")]: {
        marginTop: 65,
      },
      [theme.breakpoints.between("sm", "md")]: {
        marginTop: 55,
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: 55,
      },
    
  background: "linear-gradient(to right, #000, #ee8417)",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  position: "relative",
}));

const ProfileContainer = styled(Paper)(({ theme }) => ({
    marginTop: 60,
  padding: theme.spacing(4),
  width: "100%", // Default width for all screens
  background: "#fff",
  [theme.breakpoints.up("lg")]: {
    width: 400,
  },
  [theme.breakpoints.between("md", "lg")]: {
    width: 360,
  },
  [theme.breakpoints.between("sm", "md")]: {
    width: 320,
  },
  [theme.breakpoints.down("sm")]: {
    width: 260,
    padding: theme.spacing(3),
  },
}));

const AvatarContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  marginBottom: "1rem",
});

const InputField = styled(TextField)({
  marginBottom: "1rem",
  "& .MuiInputBase-input": {
    fontFamily: "Outfit, sans-serif",
  },
  "& .MuiInputLabel-root": {
    fontFamily: "Outfit, sans-serif",
  },
});

const SaveButton = styled(Button)(({ theme }) => ({
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

const CircularProgressWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%",
});

const ProfileSettings = () => {
  const [user, setUser] = useState({ name: "", email: "", avatar: "", autoRenew: false });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          const response = await axios.get(`http://localhost:3000/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleAvatarUpload = async () => {
    if (selectedFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append("avatar", selectedFile);

      try {
        const token = localStorage.getItem("token");
        await axios.post("http://localhost:3000/users/me/avatar", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        const response = await axios.get("http://localhost:3000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setSelectedFile(null);
      } catch (error) {
        console.error("Error uploading avatar:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:3000/users/me", user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handlePasswordReset = () => {
    navigate("/reset-password");
  };

  const handleAutoRenewToggle = async (event) => {
    setUser({ ...user, autoRenew: event.target.checked });
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:3000/users/me/auto-renew", { autoRenew: event.target.checked }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Error updating auto-renew subscription:", error);
      alert("Failed to update auto-renew subscription.");
    }
  };

  const handleCancelSubscription = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/users/me/cancel-subscription", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Subscription cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      alert("Failed to cancel subscription.");
    }
  };

  if (loading) {
    return (
      <CircularProgressWrapper>
        <CircularProgress />
      </CircularProgressWrapper>
    );
  }

  return (
    <>
      <CustomerNavbar />
      <BackgroundContainer>
        <ProfileContainer elevation={3}>
          <AvatarContainer>
            <Avatar
              src={user.avatar || ""}
              sx={{ width: 100, height: 100, mb: 2 }}
            >
              {!user.avatar && user.name.charAt(0).toUpperCase()}
            </Avatar>
            <input
              type="file"
              accept="image/*"
              id="avatar-upload"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label htmlFor="avatar-upload">
              <IconButton
                color="primary"
                component="span"
                onClick={handleAvatarUpload}
              >
                <CameraAlt />
              </IconButton>
            </label>
            {uploading && <CircularProgress />}
          </AvatarContainer>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}
          >
            Profile Settings
          </Typography>
          <Box component="form">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </Grid>
            </Grid>
            <SaveButton
              variant="contained"
              fullWidth
              onClick={handleSaveChanges}
            >
              Save Changes
            </SaveButton>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              startIcon={<Lock />}
              onClick={handlePasswordReset}
              sx={{ marginTop: "1rem", borderRadius: "20px" }}
            >
              Reset Password
            </Button>
            <FormControlLabel
              control={
                <Switch
                  checked={user.autoRenew}
                  onChange={handleAutoRenewToggle}
                  color="primary"
                />
              }
              label="Auto-Renew Subscription"
              sx={{ marginTop: "1rem" }}
            />
            <Button
              variant="outlined"
              color="error"
              fullWidth
              startIcon={<Cancel />}
              onClick={handleCancelSubscription}
              sx={{ marginTop: "1rem", borderRadius: "20px" }}
            >
              Cancel Subscription
            </Button>
          </Box>
        </ProfileContainer>
      </BackgroundContainer>
    </>
  );
};

export default ProfileSettings;
