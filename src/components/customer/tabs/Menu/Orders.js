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
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import CustomerNavbar from "../../navbar/CustomerNavbar";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/lab/Rating";

const OrdersPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
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
          navigate("/login");
          return;
        }

        const response = await axios.post(
          "http://localhost:3000/order/user",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const ordersData = response.data;
        const ratedOrders = await Promise.all(
          ordersData.delivered.map(async (order) => {
            const ratingResponse = await axios.post(
              "http://localhost:3000/order/get-rider-rating",
              { orderId: order.id }
            );
            return { ...order, riderRating: ratingResponse.data, isAvailable: order.isAvailable };
          })
        );

        setOrders({
          todaysOrders: ordersData.todaysOrders || [],
          delivered: ratedOrders || [],
          future: ordersData.upcomingOrders || [],
        });
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const handleRatingChange = async (orderId, newValue) => {
    try {
      await axios.post("http://localhost:3000/order/create-rider-rating", {
        orderId,
        riderRating: newValue,
      });

      setOrders((prevOrders) => ({
        ...prevOrders,
        delivered: prevOrders.delivered.map((order) =>
          order.id === orderId ? { ...order, riderRating: newValue } : order
        ),
      }));
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const handleAvailabilityToggle = async (orderId, isAvailable) => {
    try {
      const endpoint = isAvailable ? "mark-as-unavailable" : "mark-as-available";
      await axios.post(`http://localhost:3000/order/${endpoint}`, { orderId });

      setOrders((prevOrders) => {
        // Update the state based on the availability change
        const updateOrders = (orders) =>
          orders.map((order) =>
            order.id === orderId ? { ...order, isAvailable: !isAvailable } : order
          );

        return {
          ...prevOrders,
          todaysOrders: updateOrders(prevOrders.todaysOrders),
          future: updateOrders(prevOrders.future),
        };
      });
    } catch (error) {
      console.error(`Error toggling availability:`, error);
    }
  };

  const todaysOrders = orders.todaysOrders;
  const deliveredOrders = orders.delivered;
  const futureOrders = orders.future;

  return (
    <>
      <CustomerNavbar />
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box sx={{ py: 8, px: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold", fontFamily: "Outfit", textAlign: "center", marginTop: "50px" }}>
          Your Orders
        </Typography>

        <Grid container spacing={4}>
          {[{
            title: "Total Orders",
            count: deliveredOrders.length + todaysOrders.length + futureOrders.length,
            bgColor: "#000",
          }, {
            title: "Orders Delivered",
            count: deliveredOrders.length,
            bgColor: "#ee8417",
          }, {
            title: "Pending Orders",
            count: futureOrders.length,
            bgColor: "#000",
          }].map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper sx={{ p: 4, textAlign: "center", backgroundColor: item.bgColor, color: "#fff" }}>
                <Typography variant="h6" sx={{ mb: 2, fontFamily: "Outfit", fontWeight: "bold" }}>{item.title}</Typography>
                <Typography variant="h4" sx={{ fontFamily: "Outfit", fontWeight: "bold" }}>{item.count}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={4}>
          {[{
            title: "Delivering Today",
            orders: todaysOrders,
            buttonText: "Mark as Unavailable",
          }, {
            title: "Upcoming Orders",
            orders: futureOrders,
            buttonText: "Mark as Unavailable",
          }, {
            title: "Delivered",
            orders: deliveredOrders,
            rating: true,
          }].map((section, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Typography variant="h6" sx={{ mb: 2, fontFamily: "Outfit", textAlign: "center" }}>{section.title}</Typography>
              <Box>
                {section.orders.map((order) => (
                  <motion.div key={order.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                    <Paper sx={{ mb: 2, p: 2, textAlign: "center" }}>
                      <CardMedia component="img" height="180" image={order.dailyMenu.picture} alt={order.dailyMenu.name} />
                      <Typography variant="body1" sx={{ fontFamily: "Outfit" }}>{order.dailyMenu.name}</Typography>
                      <Typography variant="body2" sx={{ fontFamily: "Outfit", color: "gray" }}>
                        {index === 2 ? `Delivered on ${new Date(order.delivery.updatedAt || order.dailyMenu.date).toLocaleDateString()}` : `Delivering ${index === 0 ? "today" : `on ${new Date(order.dailyMenu.date).toLocaleDateString()}`}`}
                      </Typography>
                      {section.rating && (
                        <CardContent>
                          <Typography sx={{ fontFamily: "Outfit" }}>Rate your rider</Typography>
                          <Rating name={`rating-${order.id}`} value={order.riderRating || 0} onChange={(event, newValue) => handleRatingChange(order.id, newValue)} />
                        </CardContent>
                      )}
                      {section.buttonText && (
                        <Button
                          variant="contained"
                          sx={{ mt: 2, fontFamily: "Outfit", borderRadius: "20px", backgroundColor: order.isAvailable ? "red" : "green", color: "#fff", "&:hover": { backgroundColor: order.isAvailable ? "darkred" : "darkgreen" } }}
                          onClick={() => handleAvailabilityToggle(order.id, order.isAvailable)}
                        >
                          {order.isAvailable ? "Mark as Unavailable" : "Mark as Available"}
                        </Button>
                      )}
                    </Paper>
                  </motion.div>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider />

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h5" sx={{ fontFamily: "Outfit", fontWeight: "bold", mb: 2 }}>
            Looking forward to your next order?
          </Typography>
          <Button variant="contained" sx={{ fontFamily: "Outfit", fontWeight: "bold", py: 1.5, px: 3, marginRight: 2, borderRadius: "40px", backgroundColor: "#ee8417", color: "#fff", "&:hover": { backgroundColor: "#000" } }}>
            See All History
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default OrdersPage;
