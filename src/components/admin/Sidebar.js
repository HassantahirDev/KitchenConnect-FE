import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import {
  Home as HomeIcon,
  Add as AddIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
} from "@mui/icons-material";

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 350,
  height: "100vh",
  backgroundColor: theme.palette.background.paper,
  position: "fixed",
  top: 64,
  left: 0,
  display: "flex",
  flexDirection: "column",
  boxShadow: theme.shadows[3],
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "auto",
    position: "relative",
  },
}));

const SidebarItem = styled(ListItemButton)(({ theme, selected }) => ({
  backgroundColor: selected ? theme.palette.action.selected : "inherit",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function Sidebar() {
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState("");

  const handleClick = (page) => {
    setSelected(page);
    switch (page) {
      case "Menu":
        navigate("/dashboard/current-month-menu");
        break;
      case "Add Monthly Menu":
        navigate("/add-monthly-menu");
        break;
      case "Add Menu Items":
        navigate("/add-menu-items");
        break;
      case "Hostelite's Orders":
        navigate("/orders/hostelite-orders");
        break;

      case "Orders":
        navigate("/orders");
        break;
      case "Riders":
        navigate("/riders");
        break;
      default:
        break;
    }
  };

  return (
    <SidebarContainer>
      <List>
        <SidebarItem
          selected={selected === "Menu"}
          onClick={() => handleClick("Menu")}
        >
          <HomeIcon sx={{ mr: 2 }} />
          <ListItemText primary="Menu" />
        </SidebarItem>
        <SidebarItem
          selected={selected === "Add Monthly Menu"}
          onClick={() => handleClick("Add Monthly Menu")}
          sx={{ pl: 4 }}
        >
          <AddIcon sx={{ mr: 2 }} />
          <ListItemText primary="Add Monthly Menu" />
        </SidebarItem>
        <SidebarItem
          selected={selected === "Add Menu Items"}
          onClick={() => handleClick("Add Menu Items")}
          sx={{ pl: 4 }}
        >
          <AddIcon sx={{ mr: 2 }} />
          <ListItemText primary="Add Menu Items" />
        </SidebarItem>
        <Divider />
        <SidebarItem
          selected={selected === "Orders"}
          onClick={() => handleClick("Orders")}
        >
          <ShoppingCartIcon sx={{ mr: 2 }} />
          <ListItemText primary="Orders" />
        </SidebarItem>
        <SidebarItem
          selected={selected === "Companys Orders"}
          onClick={() => handleClick("Companys Orders")}
          sx={{ pl: 4 }}
        >
          <AddIcon sx={{ mr: 2 }} />
          <ListItemText primary="Company's Orders" />
        </SidebarItem>
        <SidebarItem
          selected={selected === "Hostelite's Orders"}
          onClick={() => handleClick("Hostelite's Orders")}
          sx={{ pl: 4 }}
        >
          <AddIcon sx={{ mr: 2 }} />
          <ListItemText primary="Hostelite's Orders" />
        </SidebarItem>
        <SidebarItem
          selected={selected === "Riders"}
          onClick={() => handleClick("Riders")}
        >
          <PeopleIcon sx={{ mr: 2 }} />
          <ListItemText primary="Riders" />
        </SidebarItem>
      </List>
    </SidebarContainer>
  );
}
