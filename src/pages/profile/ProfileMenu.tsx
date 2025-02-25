import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Avatar, Dialog } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutPage from "../../logout/Logout"; 

const ProfileMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openLogout, setOpenLogout] = useState(false); 
  const navigate = useNavigate();

  const email = localStorage.getItem("email") || "user@example.com";
  const userInitial = email.charAt(0).toUpperCase();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate("/profile");
  };

  const handleLogout = () => {
    setAnchorEl(null);
    setOpenLogout(true); 
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Avatar sx={{ bgcolor: "purple" }}>{userInitial}</Avatar>
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      
      <Dialog open={openLogout} onClose={() => setOpenLogout(false)} maxWidth="sm" fullWidth>
        <LogoutPage />
      </Dialog>
    </div>
  );
};

export default ProfileMenu;

