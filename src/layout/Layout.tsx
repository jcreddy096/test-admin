
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import TopBar from "../components/common/TopBar";
import Breadcrumbs from "../components/common/Breadcrumbs";

const Layout = () => {
  return (
    <Box display="flex" height="100vh">
    
      <Sidebar />

      <Box flex={1} display="flex" flexDirection="column">
       
        <TopBar />

        <Box sx={{ px: 3, py: 1 }}>
          <Breadcrumbs />
        </Box>

        <Box sx={{ flex: 1, overflow: "auto", p: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
