import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";


const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selected, setSelected] = React.useState("");

  const navigate = useNavigate();


 

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    setSelected(page);
    if (page === "Menu") {
      navigate("/dashboard/current-month-menu");
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <Box
        sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1, color: "#000" }}
      >
        <Sidebar selected={selected} onClick={handleCloseNavMenu} />
      </Box>
      <AppBar position="fixed" sx={{ backgroundColor: "#fff", color: "#000" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component={Link}
              to="/dashboard"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "poppins",
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#000", // Black color
              }}
            >
              KitchenConnect
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
                color="inherit"
              >
                <MenuIcon sx={{ color: "#000" }} /> {/* Black color */}
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <Sidebar
                  selected={selected}
                  onClick={(page) => {
                    handleCloseNavMenu(page);
                    toggleDrawer(false)();
                  }}
                />
              </Drawer>
            </Box>

            <Typography
              variant="h5"
              href="/dashboard"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "poppins",
                fontWeight: 700,
                color: "#000", // Black color
                textDecoration: "none",
              }}
            >
              KitchenConnect
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Box
              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/2.jpg"
                    sx={{ bgcolor: "#000" }}
                  />{" "}
                  {/* Black background for avatar */}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={
                      setting === "Logout" ? handleLogout : handleCloseUserMenu
                    }
                  >
                    <Typography textAlign="center" sx={{ color: "#000" }}>
                      {setting}
                    </Typography>{" "}
                    {/* Black color */}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default ResponsiveAppBar;
