import { useParams, useNavigate } from "react-router-dom";
import UserForm from "../../section/users/UserForm";
import { Container, Typography } from "@mui/material";

const EditUserPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>Edit User</Typography>
      <UserForm userId={Number(id)} onSuccess={() => navigate("/users")} />
      
    </Container>
  );
};

export default EditUserPage;
