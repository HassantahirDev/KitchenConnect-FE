import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  Hidden,
  Menu,
  MenuItem,
  ListItemIcon,
  Avatar,
  Drawer,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home,
  ContactMail,
  Login,
  PersonAdd,
  RestaurantMenu,
  Fastfood,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#ee8417",
    marginTop: "8px",
    overflow: "visible",
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      left: "50%",
      transform: "translateX(-50%) translateY(-50%)",
      width: 0,
      height: 0,
      borderLeft: "10px solid transparent",
      borderRight: "10px solid transparent",
      borderBottom: "10px solid #ee8417",
    },
  },
}));

const StyledAppBar = styled(AppBar)({
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  backgroundColor: "#ee8417",
});

const CustomerNavbar = () => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && ["Tab", "Shift"].includes(event.key))
      return;
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setProfileAnchor(null);
  };

  return (
    <StyledAppBar position="fixed">
      <Toolbar sx={{ height: { sm: 40, lg: 80 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontFamily: "Outfit", fontWeight: 700 }}
            >
              <Hidden lgUp>
                <Drawer
                  anchor="left"
                  open={drawerOpen}
                  onClose={toggleDrawer(false)}
                >
                  <Slide direction="right" in={drawerOpen}>
                    <div
                      style={{ visibility: drawerOpen ? "visible" : "hidden" }}
                    >
                      <Sidebar
                        selected=""
                        onClick={() => setDrawerOpen(false)}
                      />
                    </div>
                  </Slide>
                </Drawer>

                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
              Dana Pani
            </Typography>
            <Box
              sx={{
                flexGrow: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Hidden smDown mdDown>
                {[
                  { label: "Home", icon: <Home />, link: "/" },
                  {
                    label: "Menu ⛛",
                    icon: <RestaurantMenu />,
                    onClick: (e) => setMenuAnchor(e.currentTarget),
                  },
                  { label: "Contact", icon: <ContactMail />, link: '/contact-us' },
                ].map((item, index) => (
                  <Button
                    key={index}
                    color="inherit"
                    startIcon={item.icon}
                    component={Link}
                    to={item.link || "#"}
                    onClick={item.onClick}
                    sx={{ fontFamily: "Outfit", mx: 1.5 }}
                  >
                    {item.label}
                  </Button>
                ))}
                <StyledMenu
                  anchorEl={menuAnchor}
                  open={Boolean(menuAnchor)}
                  onClose={() => setMenuAnchor(null)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  sx={{ marginLeft: "0", marginTop: "8px" }} // Adjust margin as needed
                >
                  {[
                    { label: "Monthly Menu", link: "/menu" },
                    { label: "Your Order", link: "/menu/starter" },
                  ].map((item, index) => (
                    <MenuItem
                      key={index}
                      component={Link}
                      to={item.link}
                      onClick={() => setMenuAnchor(null)}
                      sx={{ fontFamily: "Outfit", color: "#ffffff" }}
                    >
                      <ListItemIcon>
                        <Fastfood sx={{ color: "#ffffff", fontFamily: "Outfit" }} />
                      </ListItemIcon>
                      <Typography sx={{ fontFamily: "Outfit", color: "#ffffff" }}>{item.label}</Typography>
                    </MenuItem>
                  ))}
                </StyledMenu>
              </Hidden>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {isAuthenticated ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    onClick={(e) => setProfileAnchor(e.currentTarget)}
                    sx={{
                      backgroundColor: "#fff",
                      color: "#000",
                      cursor: "pointer",
                      borderRadius: "50%",
                    }}
                  >
                    U
                  </Avatar>
                  <StyledMenu
                    anchorEl={profileAnchor}
                    open={Boolean(profileAnchor)}
                    onClose={() => setProfileAnchor(null)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    sx={{ marginTop: "8px" }}
                  >
                    {[
                      {
                        label: "Profile",
                        link: "/profile",
                        icon: <PersonAdd />,
                      },
                      {
                        label: "Logout",
                        onClick: handleLogout,
                        icon: <Login />,
                      },
                    ].map((item, index) => (
                      <MenuItem
                        key={index}
                        component={item.link ? Link : "div"}
                        to={item.link}
                        onClick={item.onClick || (() => setProfileAnchor(null))}
                        sx={{ fontFamily: "Outfit", color: "#ffffff" }}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <Typography sx={{ fontFamily: "Outfit", color: "#ffffff" }}>{item.label}</Typography>
                      </MenuItem>
                    ))}
                  </StyledMenu>
                </Box>
              ) : (
                <>
                  <Hidden smDown mdDown>
                    <Button
                      color="inherit"
                      startIcon={<Login />}
                      component={Link}
                      to="/login"
                      sx={{ mr: 1, fontFamily: "Outfit" }}
                    >
                      Login
                    </Button>
                  </Hidden>
                  <Button
                    variant="contained"
                    startIcon={<PersonAdd />}
                    component={Link}
                    to="/register"
                    sx={{
                      backgroundColor: "#fff",
                      fontFamily: "Outfit",
                      borderRadius: "20px",
                      color: "#000",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </StyledAppBar>
  );
};

export default CustomerNavbar;
