import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Hidden,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Drawer,
  IconButton,
  Slide,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import {
  Home,
  ContactMail,
  Login,
  PersonAdd,
  RestaurantMenu,
  Fastfood,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#ee8417",
    marginTop: "8px", // adds a little gap below the menu button
    overflow: "visible", // makes the arrow visible outside the menu
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

const CustomerNavbar = () => {
  const StyledAppBar = styled(AppBar)(({ theme }) => ({
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#ee8417",
  }));

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [anchorElI, setAnchorElI] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    handleMenuClose();
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
              {/* Hide these buttons on mobile */}
              <Hidden smDown mdDown>
                <Button
                  color="inherit"
                  startIcon={<Home />}
                  component={Link}
                  to="/"
                  sx={{ fontFamily: "Outfit", mx: 1.5 }} // 30px space, 1.5 * 8px (MUI spacing unit) = 12px margin on each side
                >
                  Home
                </Button>

                <Button
                  color="inherit"
                  startIcon={<RestaurantMenu />}
                  onClick={handleMenuClick}
                  sx={{ fontFamily: "Outfit", mx: 1.5 }} // 30px space, 1.5 * 8px (MUI spacing unit) = 12px margin on each side
                >
                  Menu ⛛
                </Button>

                <Button
                  color="inherit"
                  startIcon={<ContactMail />}
                  sx={{ fontFamily: "Outfit", mx: 1.5 }} // 30px space, 1.5 * 8px (MUI spacing unit) = 12px margin on each side
                >
                  Contact
                </Button>

                {/* Styled Dropdown Menu with Arrow */}
                <StyledMenu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }} // Adjusted to align with the left edge
                  transformOrigin={{ vertical: "top", horizontal: "left" }} // Adjusted to align with the left edge
                  MenuListProps={{ sx: { backgroundColor: "#ee8417" } }}
                  sx={{
                    marginLeft: "705px",
                    marginTop: "62px",
                    fontFamily: "Outfit",
                  }}
                >
                  <MenuItem
                    onClick={handleMenuClose}
                    component={Link}
                    to="/menu"
                    sx={{ fontFamily: "Outfit", color: "#ffffff" }}
                  >
                    <ListItemIcon>
                      <Fastfood sx={{ color: "#ffffff" }} />
                    </ListItemIcon>
                    <Typography sx={{ color: "#ffffff", fontFamily: "Outfit" }}>
                      Monthly Menu
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={handleMenuClose}
                    component={Link}
                    to="/menu/starter"
                    sx={{ fontFamily: "Outfit", color: "#ffffff" }}
                  >
                    <ListItemIcon>
                      <Fastfood sx={{ color: "#ffffff" }} />
                    </ListItemIcon>
                    <Typography sx={{ color: "#ffffff", fontFamily: "Outfit" }}>
                      Your Order
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={handleMenuClose}
                    component={Link}
                    to="/menu/starter"
                    sx={{ fontFamily: "Outfit", color: "#ffffff" }}
                  >
                    <ListItemIcon>
                      <Fastfood sx={{ color: "#ffffff" }} />
                    </ListItemIcon>
                    <Typography sx={{ color: "#ffffff", fontFamily: "Outfit" }}>
                      Custom Menu
                    </Typography>
                  </MenuItem>
                </StyledMenu>
              </Hidden>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {!isAuthenticated ? (
                <></>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <Avatar
                    onClick={handleProfileClick}
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
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleProfileClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    MenuListProps={{ sx: { backgroundColor: "#ee8417" } }}
                    sx={{
                      marginLeft: "auto",
                      marginTop: "8px",
                      fontFamily: "Outfit",
                    }}
                  >
                    <MenuItem
                      onClick={handleProfileClose}
                      component={Link}
                      to="/profile"
                      sx={{ fontFamily: "Outfit", color: "#ffffff" }}
                    >
                      <ListItemIcon>
                        <PersonAdd sx={{ color: "#ffffff" }} />
                      </ListItemIcon>
                      <Typography
                        sx={{ color: "#ffffff", fontFamily: "Outfit" }}
                      >
                        Profile
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={handleLogout}
                      sx={{ fontFamily: "Outfit", color: "#ffffff" }}
                    >
                      <ListItemIcon>
                        <Login sx={{ color: "#ffffff" }} />
                      </ListItemIcon>
                      <Typography
                        sx={{ color: "#ffffff", fontFamily: "Outfit" }}
                      >
                        Logout
                      </Typography>
                    </MenuItem>
                  </StyledMenu>
                </Box>
              )}
              {!isAuthenticated && (
                <>
                  {!isAuthenticated ? (
                    <></>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <Avatar
                        onClick={handleProfileClick}
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
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleProfileClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        MenuListProps={{ sx: { backgroundColor: "#ee8417" } }}
                        sx={{
                          marginLeft: "auto",
                          marginTop: "8px",
                          fontFamily: "Outfit",
                        }}
                      >
                        <MenuItem
                          onClick={handleProfileClose}
                          component={Link}
                          to="/profile"
                          sx={{ fontFamily: "Outfit", color: "#ffffff" }}
                        >
                          <ListItemIcon>
                            <PersonAdd sx={{ color: "#ffffff" }} />
                          </ListItemIcon>
                          <Typography
                            sx={{ color: "#ffffff", fontFamily: "Outfit" }}
                          >
                            Profile
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={handleLogout}
                          sx={{ fontFamily: "Outfit", color: "#ffffff" }}
                        >
                          <ListItemIcon>
                            <Login sx={{ color: "#ffffff" }} />
                          </ListItemIcon>
                          <Typography
                            sx={{ color: "#ffffff", fontFamily: "Outfit" }}
                          >
                            Logout
                          </Typography>
                        </MenuItem>
                      </StyledMenu>
                    </Box>
                  )}
                  {/* Always show Login button */}
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
