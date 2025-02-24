
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Divider, Toolbar } from "@mui/material";
import { Home, People, Inventory, Category, Store, Collections, Business, Settings } from "@mui/icons-material"; 
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Home", path: "/", icon: <Home /> },
    { label: "Users", path: "/users", icon: <People /> },
    { label: "Products", path: "/products", icon: <Inventory /> },
    { label: "Brands", path: "/brands", icon: <Store /> },
    { label: "Custom", path: "/custom", icon: <Settings /> },
    { label: "Category", path: "/category", icon: <Category /> },
    { label: "Media", path: "/media", icon: <Collections /> },
    { label: "Organization", path: "/organization", icon: <Business /> },
  ];

  return (
    <Drawer 
      variant="permanent" 
      sx={{ 
        width: 240, 
        flexShrink: 0, 
        "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box", backgroundColor: "black", color: "white" }
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItemButton key={item.label} onClick={() => navigate(item.path)} sx={{ "&:hover": { backgroundColor: "grey" } }}>
            <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
