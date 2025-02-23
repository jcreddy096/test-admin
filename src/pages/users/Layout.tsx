import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { Box } from "@mui/material";

const Layout = () => {
  const location = useLocation();

  const isSidebarVisiblePages = ["/", "/users"];

  const isSidebarVisible = isSidebarVisiblePages.includes(location.pathname)

    return (
    <Box style={{ display: "flex" }}>
     {isSidebarVisible && <Sidebar />} 
      <Box style={{ flexGrow: 1, padding: "20px", marginLeft: "100px" }}>
        <Breadcrumbs />
        <Outlet /> 
      </Box>
    </Box>
  );
};

export default Layout;
