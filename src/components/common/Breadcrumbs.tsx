// import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";

// const Breadcrumbs = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const pathnames = location.pathname.split("/").filter((x) => x);

//   return (
//     <MUIBreadcrumbs aria-label="breadcrumb" sx={{ mt: 2, mb: 2 }}>
//       <Link onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
//         Home
//       </Link>
//       {pathnames.map((value, index) => {
//         const to = `/${pathnames.slice(0, index + 1).join("/")}`;
//         return index === pathnames.length - 1 ? (
//           <Typography key={to}>{value}</Typography>
//         ) : (
//           <Link key={to} onClick={() => navigate(to)} style={{ cursor: "pointer" }}>
//             {value}
//           </Link>
//         );
//       })}
//     </MUIBreadcrumbs>
//   );
// };

// export default Breadcrumbs;


import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <MUIBreadcrumbs aria-label="breadcrumb" sx={{ mt: 2, mb: 2 }}>
      <Link onClick={() => navigate("/")} style={{ cursor: "pointer", textTransform: "capitalize" }}>
        Home
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        return index === pathnames.length - 1 ? (
          <Typography key={to} color="textPrimary" sx={{ textTransform: "capitalize" }}>
            {value.replace("-", " ")}
          </Typography>
        ) : (
          <Link
            key={to}
            onClick={() => navigate(to)}
            style={{ cursor: "pointer", textTransform: "capitalize" }}
          >
            {value.replace("-", " ")}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
