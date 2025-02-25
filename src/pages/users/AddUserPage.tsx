import { useNavigate } from "react-router-dom";
import UserForm from "../../section/users/UserForm";
import { Box, Container, Typography } from "@mui/material";

const AddUserPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}   >
      <Typography variant="h4" align="center"
      gutterBottom>
        Add User
        </Typography>
        <Box mt={3}>
      <UserForm userId={null} onSuccess={() => navigate("/users")} />
      </Box>
    </Container>
  );
};

export default AddUserPage;
