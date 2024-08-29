import React, { useState } from "react";
import { List, ListItem, ListItemText, Box, ListItemIcon, Divider, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/MenuBook";
import InfoIcon from "@mui/icons-material/Info";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const Sidebar = ({ selected, onClick }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuClick = () => {
    setOpenMenu(!openMenu);
  };

  const menuItems = [
    { text: "Home", path: "/", icon: <HomeIcon /> },
    { text: "Menu", path: "#", icon: <MenuIcon />, submenu: [
      { text: "Monthly Menu", path: "/menu" },
      { text: "Your Orders", path: "/your-orders" },
    ]},
    { text: "Contact Us", path: "/contact-us", icon: <InfoIcon /> },
  ];

  return (
    <Box sx={{ width: { xs: "80vw", sm: "250px" }, height: "100vh", backgroundColor: "#ee8417", color: "#FFFFFF", display: "flex", flexDirection: "column", justifyContent: "space-between", }}>
      <Box>
        <Typography variant="h5" sx={{ textAlign: "center", padding: "20px 0", fontFamily: "Outfit", letterSpacing: "1.5px" }}>
          Dana Pani
        </Typography>
        <Divider sx={{ bgcolor: "#FFFFFF" }} />
        <List>
          {menuItems.map((item) => (
            item.submenu ? (
              <React.Fragment key={item.text}>
                <ListItem
                  button
                  onClick={handleMenuClick}
                  selected={selected === item.text}
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#000",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#e67e22",
                      "&:hover": {
                        backgroundColor: "#000000",
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "#ecf0f1" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ fontFamily: "Outfit", textAlign: "left" }} />
                  {openMenu ? <ExpandLess sx={{ color: "#ecf0f1" }} /> : <ExpandMore sx={{ color: "#ecf0f1" }} />}
                </ListItem>
                {openMenu && item.submenu.map((subItem) => (
                  <ListItem
                    button
                    key={subItem.text}
                    component={Link}
                    to={subItem.path}
                    sx={{
                      pl: 4,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#000",
                      },
                    }}
                  >
                    <ListItemText primary={subItem.text} sx={{ fontFamily: "Outfit", textAlign: "left", color: "#ecf0f1" }} />
                  </ListItem>
                ))}
              </React.Fragment>
            ) : (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                selected={selected === item.text}
                onClick={() => onClick(item.text)}
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#000",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#e67e22",
                    "&:hover": {
                      backgroundColor: "#000000",
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#ecf0f1" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ fontFamily: "Outfit", textAlign: "left" }} />
              </ListItem>
            )
          ))}
        </List>
      </Box>
      <Box sx={{ padding: "20px", textAlign: "center" }}>
        <Button
          variant="outlined"
          color="inherit"
          component={Link}
          to="/register"
          sx={{
            width: "100%",
            color: "#FFFFFF",
            borderColor: "#FFFFFF",
            mb: 2,
            "&:hover": {
              backgroundColor: "#e67e22",
              borderColor: "#e67e22",
            },
            fontFamily: "Outfit",
          }}
        >
          Sign Up
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          component={Link}
          to="/login"
          sx={{
            width: "100%",
            color: "#FFFFFF",
            borderColor: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#e67e22",
              borderColor: "#e67e22",
            },
            fontFamily: "Outfit",
          }}
        >
          Sign In
        </Button>
        <Divider sx={{ bgcolor: "#FFFFFF", mt: 2 }} />
        <Typography variant="body2" sx={{ fontFamily: "Outfit", mt: 2 }}>
          &copy; 2024 @ Dana Pani
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
