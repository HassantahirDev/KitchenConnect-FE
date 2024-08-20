import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomerNavbar from "../landing-page/CustomerNavbar";
import Footer from "../landing-page/Footer";

// Mock Data for 10 Days of Menu Items
const menuItems = [
  {
    day: 1,
    name: "Pizza Margherita",
    description: "Classic pizza with tomatoes and cheese",
    price: "$12",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    day: 2,
    name: "Cheeseburger",
    description: "Juicy beef patty with cheese",
    price: "$10",
    image:
      "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    day: 3,
    name: "Pasta Carbonara",
    description: "Creamy pasta with pancetta and cheese",
    price: "$15",
    image:
      "https://images.unsplash.com/photo-1516685018646-549198525c1b?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    day: 4,
    name: "Caesar Salad",
    description: "Crisp romaine with Caesar dressing",
    price: "$8",
    image:
      "https://images.unsplash.com/photo-1670237735381-ac5c7fa72c51?q=80&w=3412&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    day: 5,
    name: "Grilled Chicken",
    description: "Tender chicken breast with herbs",
    price: "$14",
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    day: 6,
    name: "Vegetable Stir-fry",
    description: "Mixed vegetables with soy sauce",
    price: "$11",
    image:
      "https://images.unsplash.com/photo-1464500650248-1a4b45debb9f?q=80&w=3399&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    day: 7,
    name: "Beef Tacos",
    description: "Spicy beef tacos with salsa",
    price: "$9",
    image:
      "https://plus.unsplash.com/premium_photo-1661780139424-d582ec7aa9e2?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    day: 8,
    name: "Spaghetti Bolognese",
    description: "Pasta with rich meat sauce",
    price: "$13",
    image:
      "https://plus.unsplash.com/premium_photo-1674511582428-58ce834ce172?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    day: 9,
    name: "Fish and Chips",
    description: "Crispy battered fish with fries",
    price: "$12",
    image:
      "https://images.unsplash.com/photo-1553557202-e8e60357f061?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    day: 10,
    name: "Chocolate Cake",
    description: "Rich chocolate cake with icing",
    price: "$6",
    image:
      "https://plus.unsplash.com/premium_photo-1715015439618-0732b5925875?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Styled Components
const LocationBanner = styled(Box)(({ theme }) => ({
  height: "200px",
  background: `url('https://images.unsplash.com/photo-1526823127573-0fda76b6c24f?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center/cover no-repeat`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
  borderRadius: "8px",
  marginTop: "110px",
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    height: "150px",
  },
  [theme.breakpoints.up("md")]: {
    height: "200px",
  },
}));

const CustomMenuBanner = styled(Box)(({ theme }) => ({
  height: "200px",
  background: "rgba(238, 132, 23)", // Adjusted opacity to 50%
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    height: "150px",
    padding: theme.spacing(1),
  },
  [theme.breakpoints.up("md")]: {
    height: "200px",
    padding: theme.spacing(2),
  },
}));

const MenuItemCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  "&:hover": {
    boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
  },
}));

const Menu = () => {
  const [location, setLocation] = useState("");

  useEffect(() => {
    // Mock function to get user location (In a real app, use geolocation API)
    setLocation("TDC, Johar Town Lahore");
  }, []);

  return (
    <>
      <CustomerNavbar />
      <Container maxWidth="lg">
        {/* Location Banner */}
        <LocationBanner>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Outfit, sans-serif",
              fontSize: {
                xs: "0.9rem", // Smallest screens
                sm: "1.225rem", // Small screens
                md: "1.4rem", // Medium screens
              },
            }}
          >
            Delivering to {location}
          </Typography>
        </LocationBanner>

        {/* Custom Menu Banner */}
        <CustomMenuBanner>
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              mb: 2,
              textAlign: "center",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            Personalize Your Experience!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#fff",
              mb: 3,
              textAlign: "center",
              maxWidth: "600px",
              fontFamily: "Outfit, sans-serif",
              fontSize: {
                xs: "0.575rem",
                sm: "0.875rem",
                md: "1.1rem", // Smallest screens
              },
            }}
          >
            Don’t see what you like? Customize your own menu tailored to your
            taste and preferences. Create your own menu to enjoy your favorite
            dishes whenever you want!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: {
                xs: "30px", // Smallest screens
                sm: "35px", // Small screens
                md: "40px", // Medium screens
               
              },
              fontSize: {
                xs: "0.5rem", // Smallest screens
                sm: "0.725rem", // Small screens
                md: "0.9rem", // Medium screens
              },
              padding: {
                xs: "8px 16px", // Smallest screens
                sm: "10px 20px", // Small screens
                md: "12px 24px", // Medium screens
             
              },
              fontFamily: "Outfit",
              backgroundColor: "#fff",
              color: "#ee8417",
              "&:hover": { backgroundColor: "#ffe4b3" },
            }}
          >
            Create Your Own Menu
          </Button>
        </CustomMenuBanner>

        {/* Menu Items Day by Day */}
        <Grid container spacing={4}>
          {menuItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MenuItemCard>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image}
                  alt={item.name}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    Day {item.day}: {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, fontFamily: "Outfit, sans-serif" }}
                  >
                    {item.description}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, fontFamily: "Outfit, sans-serif" }}
                  >
                    {item.price}
                  </Typography>
                </CardContent>
              </MenuItemCard>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Menu;
