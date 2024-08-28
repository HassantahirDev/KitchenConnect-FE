import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Paper,
  Button,
  Divider,
  Backdrop,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import { motion } from "framer-motion";
import CustomerNavbar from "../../navbar/CustomerNavbar";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
    const theme = useTheme();
    const navigate = useNavigate(); // Use the useNavigate hook
    const [orders, setOrders] = useState({
      todaysOrders: [],
      delivered: [],
      future: [],
    });
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            navigate("/login"); // Redirect to login if no token
            return;
          }
  
          const response = await axios.post(
            "http://localhost:3000/order/user",
            {}, // This is the request body, which is empty in this case
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setOrders(response.data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchOrders();
    }, [navigate]); // Add navigate to dependency array
  

  const handleDeliveryStatus = (orderId) => {
    // Handle showing delivery status logic here
    alert(`Showing delivery status for order ${orderId}`);
  };

  const handleMarkAsUnavailable = (orderId) => {
    // Handle marking order as unavailable logic here
    alert(`Marking order ${orderId} as unavailable`);
  };

  // Ensure the orders object has arrays defined, even if they are empty
  const todaysOrders = orders.todaysOrders || [];
  const deliveredOrders = orders.delivered || [];
  const futureOrders = orders.upcomingOrders || [];

  return (
    <>
      <CustomerNavbar />

      {/* Full-Screen Loader */}
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Main Content */}
      <Box sx={{ py: 8, px: 4 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: "bold",
            fontFamily: "Outfit",
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          Your Orders
        </Typography>

        <Grid container spacing={4}>
          {/* Order Statistics */}
          <Grid item xs={12} sm={4}>
            <Paper
              sx={{
                p: 4,
                textAlign: "center",
                backgroundColor: "#000",
                color: "#fff",
              }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 2, fontFamily: "Outfit", fontWeight: "bold" }}
              >
                Total Orders
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontFamily: "Outfit", fontWeight: "bold" }}
              >
                {deliveredOrders.length +
                  todaysOrders.length +
                  futureOrders.length}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper
              sx={{
                p: 4,
                textAlign: "center",
                backgroundColor: "#ee8417",
                color: "#fff",
              }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 2, fontFamily: "Outfit", fontWeight: "bold" }}
              >
                Orders Delivered
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontFamily: "Outfit", fontWeight: "bold" }}
              >
                {deliveredOrders.length}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper
              sx={{
                p: 4,
                textAlign: "center",
                backgroundColor: "#000",
                color: "#fff",
              }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 2, fontFamily: "Outfit", fontWeight: "bold" }}
              >
                Pending Orders
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontFamily: "Outfit", fontWeight: "bold" }}
              >
                {futureOrders.length+1}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={4}>
          {/* Today's Orders */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontFamily: "Outfit", textAlign: "center" }}
            >
              Delivering Today
            </Typography>
            <Box>
              {todaysOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Paper sx={{ mb: 2, p: 2, textAlign: "center" }}>
                    <CardMedia
                      component="img"
                      height="180"
                      image={order.dailyMenu.picture}
                      alt={order.dailyMenu.name}
                    />
                    <Typography variant="body1" sx={{ fontFamily: "Outfit" }}>
                      {order.dailyMenu.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: "Outfit", color: "gray" }}
                    >
                      Delivering today
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        mr: 1,
                        borderRadius: "25px",
                        backgroundColor: "grey",
                        fontFamily: "Outfit",
                      }}
                    //   onClick={() => handleDeliveryStatus(order.id)}
                    >
                      {order.delivery.status}
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        mt: 2,
                        ml: 1,
                        borderColor: "#ee8417",
                        color: "#ee8417",
                        borderRadius: "25px",
                        fontfamily: "Outfit",
                        "&:hover": {
                          borderColor: "#ee8417",
                          color: "#fff", // Change text color on hover if needed
                          backgroundColor: "#ee8417", // Change background color on hover if needed
                        },
                      }}
                    //   onClick={() => handleMarkAsUnavailable(order.id)}
                    >
                      Mark as Unavailable
                    </Button>
                  </Paper>
                </motion.div>
              ))}
            </Box>
          </Grid>
          {/* Delivered Orders */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontFamily: "Outfit", textAlign: "center" }}
            >
              Delivered
            </Typography>
            <Box>
              {deliveredOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Paper sx={{ mb: 2, p: 2, textAlign: "center" }}>
                    <CardMedia
                      component="img"
                      height="180"
                      image={order.dailyMenu.picture}
                      alt={order.dailyMenu.name}
                    />
                    <Typography variant="body1" sx={{ fontFamily: "Outfit" }}>
                      {order.dailyMenu.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: "Outfit", color: "gray" }}
                    >
                      Delivered on{" "}
                      {order.delivery?.updatedAt
                        ? new Date(
                            order.dailyMenu.date
                          ).toLocaleDateString()
                        : "N/A"}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        fontFamily: "Outfit",
                        borderRadius: "20px",
                        backgroundColor: "green",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "darkgreen",
                        },
                      }}
                    //   onClick={() => handleDeliveryStatus(order.id)}
                    >
                      {order.delivery.status}
                    </Button>
                  </Paper>
                </motion.div>
              ))}
            </Box>
          </Grid>

          {/* Future Orders */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontFamily: "Outfit", textAlign: "center" }}
            >
              Upcoming Deliveries
            </Typography>
            <Box>
              {futureOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Paper sx={{ mb: 2, p: 2, textAlign: "center" }}>
                    <CardMedia
                      component="img"
                      height="180"
                      image={order.dailyMenu.picture}
                      alt={order.dailyMenu.name}
                    />
                    <Typography variant="body1" sx={{ fontFamily: "Outfit" }}>
                      {order.dailyMenu.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: "Outfit", color: "gray" }}
                    >
                      Upcoming on{" "}
                      {order.delivery?.updatedAt
                        ? new Date(
                            order.dailyMenu.date
                          ).toLocaleDateString()
                        : "N/A"}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        mr: 1,
                        backgroundColor: "grey",
                        borderRadius: "25px",
                        fontFamily: "Outfit",
                      }}
                      
                    >
                      {order.delivery.status}
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        mt: 2,
                        ml: 1,
                        borderColor: "#ee8417",
                        color: "#ee8417",
                        borderRadius: "25px",
                        fontfamily: "Outfit",
                        "&:hover": {
                          borderColor: "#ee8417",
                          color: "#fff", // Change text color on hover if needed
                          backgroundColor: "#ee8417", // Change background color on hover if needed
                        },
                      }}
                     
                    >
                      Mark as Unavailable
                    </Button>
                  </Paper>
                </motion.div>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />

        {/* Call to Action */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography
            variant="h5"
            sx={{ fontFamily: "Outfit", fontWeight: "bold", mb: 2 }}
          >
            Looking forward to your next order?
          </Typography>
          <Button
            variant="contained"
            sx={{
              fontFamily: "Outfit",
              fontWeight: "bold",
              py: 1.5,
              px: 3,
              marginRight: 2,
              borderRadius: "40px",
              backgroundColor: "#ee8417",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#000",
              },
            }}
          >
            See All History
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default OrdersPage;
