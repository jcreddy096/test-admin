
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import ProfileMenu from "../../profile/users/ProfileMenu"; 

const TopBar = () => {
  return (
    <AppBar position="sticky" sx={{ bgcolor: "grey.900" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
    
        <Typography variant="h6">Dashboard</Typography>

        
        <Box>
          <ProfileMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
