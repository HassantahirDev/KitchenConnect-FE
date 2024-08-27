import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomerNavbar from "../../navbar/CustomerNavbar";
import Footer from "../../footer/Footer";
import PriceCard from "../../landing-page/PriceCard";
import axios from "axios";

// Styled Components
const LocationBanner = styled(Box)(({ theme }) => ({
  height: "200px",
  background:
    "url('https://images.unsplash.com/photo-1526823127573-0fda76b6c24f?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') center/cover no-repeat",
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
  const [menuItems, setMenuItems] = useState([]); // State to hold menu items

  useEffect(() => {
    // Mock function to get user location (In a real app, use geolocation API)
    setLocation("TDC, Johar Town Lahore");

    // Fetch current month's menu from the API
    const fetchMenuItems = async () => {
      try {
        const response = await axios.post("http://localhost:3000/menu/get-current-month-menu");

        // Add a 'day' property to each menu item based on its position in the array
        const menuWithDays = response.data.map((item, index) => ({
          ...item,
          day: index + 1, // Assign day starting from 1
        }));
      
        setMenuItems(menuWithDays); // Set menu items with day numbers
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
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

        <PriceCard />

        {/* Grid for menu items */}
        <Grid container spacing={3}>
          {menuItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MenuItemCard>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.picture}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div" sx={{fontFamily: "Outfit"}}>
                  Day: {item.day}: {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{fontFamily: "Outfit"}}>
                    Ingredients: {item.ingredients}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{fontFamily: "Outfit"}}>
                    Serving Size: {item.servingSize}
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
