// Sidebar.js

import React from "react";
import { List, ListItem, ListItemText, Box, ListItemIcon, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/MenuBook";
import InfoIcon from "@mui/icons-material/Info";

const Sidebar = ({ selected, onClick }) => {
  const menuItems = [
    { text: "Home", path: "/", icon: <HomeIcon /> },
    { text: "Menu", path: "/menu", icon: <MenuIcon /> },
    { text: "About", path: "/about", icon: <InfoIcon /> },
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
                  backgroundColor: "#34495e",
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
          ))}
        </List>
      </Box>
      <Box sx={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="body2" sx={{ fontFamily: "Outfit" }}>
          &copy; 2024 @ Dana Pani
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
