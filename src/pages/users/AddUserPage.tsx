import { useNavigate } from "react-router-dom";
import UserForm from "../../section/users/UserForm";
import { Container, Typography, Button } from "@mui/material";

const AddUserPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Add User</Typography>
      <UserForm userId={null} onSuccess={() => navigate("/users")} />
      <Button onClick={() => navigate("/users")} variant="outlined" sx={{ mt: 2 }}>
        Cancel
      </Button>
    </Container>
  );
};

export default AddUserPage;
