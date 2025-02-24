import { Button, Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    localStorage.clear();
    navigate("/login"); 
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 5, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          Are you sure you want to log out?
        </Typography>
        <Button variant="contained" color="error" sx={{ mx: 1 }} onClick={handleConfirmLogout}>
          Yes, Logout
        </Button>
        <Button variant="outlined" color="primary" sx={{ mx: 1 }} onClick={handleCancel}>
          Cancel
        </Button>
      </Paper>
    </Container>
  );
};

export default LogoutPage;
