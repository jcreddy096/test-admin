
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import TopBar from "../../components/common/TopBar"; 
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { Box } from "@mui/material";

const Layout = () => {
  const location = useLocation();
  const isSidebarVisiblePages = ["/", "/users", "/products", "/brands", "/category", "/media", "/organization"];
  const isSidebarVisible = isSidebarVisiblePages.includes(location.pathname);

  return (
    <Box style={{ display: "flex", height: "100vh" }}>
      {isSidebarVisible && <Sidebar />} 

      
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopBar /> 
        
        <Box sx={{ flex: 1, padding: "20px", marginLeft: isSidebarVisible ? "100px" : "0px" }}>
          <Breadcrumbs />
          <Outlet /> 
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
