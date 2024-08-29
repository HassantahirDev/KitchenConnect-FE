import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Backdrop,
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

const WeekSelect = styled(Select)(({ theme }) => ({
  backgroundColor: "#ee8417",
  color: "#FFFFFF",
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
  },
  "& .MuiSelect-icon": {
    color: "#FFFFFF",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ee8417",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#e67e22",
  },
}));

const Menu = () => {
  const [location, setLocation] = useState("TDC, Johar Town Lahore");
  const [menuItems, setMenuItems] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.post("http://localhost:3000/menu/get-current-month-menu");
        const weeks = Array.from({ length: 5 }, () => []);
        response.data.forEach((item, index) => {
          const week = Math.floor(index / 7);
          weeks[week].push({ ...item, week: week + 1, day: (index % 7) + 1 });
        });
        if (weeks[4].length === 0) weeks[4] = response.data.slice(28).map((item, index) => ({
          ...item,
          week: 5,
          day: index + 1,
        }));
        setMenuItems(weeks);
        setLoading(false); // Set loading to false once data is fetched
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
        <LocationBanner>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Outfit, sans-serif",
              fontSize: { xs: "0.9rem", sm: "1.225rem", md: "1.4rem" },
            }}
          >
            Delivering to {location}
          </Typography>
        </LocationBanner>

        <PriceCard />

        <Typography sx={{ fontFamily: "Outfit" }}>Select Week</Typography>
        <FormControl fullWidth variant="outlined" sx={{ mb: 4 }}>
          <InputLabel id="week-select-label"></InputLabel>
          <WeekSelect
            labelId="week-select-label"
            value={currentWeek}
            onChange={(e) => setCurrentWeek(e.target.value)}
          >
            {[1, 2, 3, 4, 5].map((week) => (
              <MenuItem key={week} value={week} sx={{ fontFamily: "Outfit" }}>
                Week {week}
              </MenuItem>
            ))}
          </WeekSelect>
        </FormControl>

        <Grid container spacing={3}>
          {menuItems[currentWeek - 1]?.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.day}>
              <MenuItemCard>
                <CardMedia component="img" height="140" image={item.picture} alt={item.name} />
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ fontFamily: "Outfit" }}>
                    Day {item.day}: {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Outfit" }}>
                    Ingredients: {item.ingredients}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "Outfit" }}>
                    Serving Size: {item.servingSize}
                  </Typography>
                </CardContent>
              </MenuItemCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Menu;



