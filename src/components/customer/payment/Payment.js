import React, { useEffect, useState } from "react";
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
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const BackgroundContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(to right, #000, #ee8417)",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  position: "relative",
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
    marginLeft: 400,
    marginRight: 0,
  },
  [theme.breakpoints.between("md", "lg")]: {
    width: 360,
    marginTop: 20,
  },
  [theme.breakpoints.between("sm", "md")]: {
    marginTop: 20,
    width: 320,
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: 20,
    padding: theme.spacing(3),
    width: 230,
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

const GatewayListContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  minWidth: "250px",
  flexDirection: "column",
  marginTop: "50px",
  marginBottom: theme.spacing(3),
  zIndex: 2,
  color: "#fff",
  alignItems: "center",
  [theme.breakpoints.up("lg")]: {
    textAlign: "left",
    marginRight: theme.spacing(8),
  },
}));

const GatewayImage = styled("img")(({ theme }) => ({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  marginRight: theme.spacing(2),
}));

const PaymentPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [gateways, setGateways] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all payment gateways
    axios
      .post("http://localhost:3000/payments/get-gateway")
      .then((response) => setGateways(response.data))
      .catch((err) => console.error(err));
  }, []);

  const createOrder = async (data, token) => {
    try {
      var orderResponse = await axios.post(
        "http://localhost:3000/order",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Order response:", orderResponse.data);
      toast.success("Your order has been sucessfully forwared, wait for confirmation!");
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      console.error("Order creation error:", err);
      toast.error("You already have subscribed to our monthly plan!");
    }
  };
  const onSubmit = async (data) => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      if (token) {
        // Decode the token to get the userId
        const decodedToken = jwtDecode(token);
        data.userId = decodedToken.userId; // Add userId to the data object
      }

      const paymentResponse = await axios.post(
        "http://localhost:3000/payments",
        data
      );
      

      if (paymentResponse.data) {
        
        await createOrder(data, token); // Call the separate function for order creation
      } else {
        toast.error("Payment failed.");
      }
    } catch (err) {
      
      // Show error toast
      toast.error("Submission failed.");
    }
  };

  return (
    <>
      <CustomerNavbar />
      <ToastContainer />
      <BackgroundContainer>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "flex-start",
            height: "100%",
            position: "relative",
            zIndex: 2,
          }}
        >
          <GatewayListContainer>
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                fontFamily: "Outfit, sans-serif",
                fontWeight: 700,
                alignItems: "center",
              }}
            >
              Payment Gateways
            </Typography>
            {gateways.length ? (
              gateways.map((gateway) => (
                <Box
                  key={gateway.id}
                  sx={{ display: "flex", alignItems: "center", marginTop: 2 }}
                >
                  <GatewayImage src={gateway.image} alt={gateway.bankTitle} />
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {gateway.bankTitle}
                    </Typography>
                    <Typography variant="body2">
                      Account No: {gateway.accountNo}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="body1">No gateways available</Typography>
            )}
          </GatewayListContainer>
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
                Make a Payment
              </Typography>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <TextField
                  label="Amount"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  {...register("amount", { required: "Amount is required" })}
                  InputProps={{
                    sx: { fontFamily: "Outfit, sans-serif", fontSize: "1rem" },
                  }}
                  InputLabelProps={{
                    sx: { fontFamily: "Outfit, sans-serif", fontSize: "1rem" },
                  }}
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                />
                <TextField
                  label="Bank Title"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  {...register("bankTitle", {
                    required: "Bank Title is required",
                  })}
                  InputProps={{
                    sx: { fontFamily: "Outfit, sans-serif", fontSize: "1rem" },
                  }}
                  InputLabelProps={{
                    sx: { fontFamily: "Outfit, sans-serif", fontSize: "1rem" },
                  }}
                  error={!!errors.bankTitle}
                  helperText={errors.bankTitle?.message}
                />
                <TextField
                  label="Account Number"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  {...register("accountNo", {
                    required: "Account Number is required",
                  })}
                  InputProps={{
                    sx: { fontFamily: "Outfit, sans-serif", fontSize: "1rem" },
                  }}
                  InputLabelProps={{
                    sx: { fontFamily: "Outfit, sans-serif", fontSize: "1rem" },
                  }}
                  error={!!errors.accountNo}
                  helperText={errors.accountNo?.message}
                />
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  {...register("phoneNo", {
                    required: "Phone Number is required",
                  })}
                  InputProps={{
                    sx: { fontFamily: "Outfit, sans-serif", fontSize: "1rem" },
                  }}
                  InputLabelProps={{
                    sx: { fontFamily: "Outfit, sans-serif", fontSize: "1rem" },
                  }}
                  error={!!errors.phoneNo}
                  helperText={errors.phoneNo?.message}
                />

                <TextField
                  label="Screenshot"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  {...register("image", {
                    required: "Screenshot is required",
                  })}
                  InputProps={{
                    sx: { fontFamily: "Outfit, sans-serif", fontSize: "1rem" },
                  }}
                  InputLabelProps={{
                    sx: { fontFamily: "Outfit, sans-serif", fontSize: "1rem" },
                  }}
                  error={!!errors.phoneNo}
                  helperText={errors.phoneNo?.message}
                />
                <StyledButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Submit Payment
                </StyledButton>
              </Box>
            </FormContainer>
          </motion.div>
        </Container>
      </BackgroundContainer>
    </>
  );
};

export default PaymentPage;
