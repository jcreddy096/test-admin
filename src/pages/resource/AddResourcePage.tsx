import { useNavigate } from "react-router-dom";
import ResourceForm from "../../section/resource/ResourceForm"; 
import { Container, Typography } from "@mui/material";

const AddResourcePage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Add Resource
      </Typography>
      <ResourceForm resourceId={null} onSuccess={() => navigate("/resource")} resource={""} />
      
    </Container>
  );
};

export default AddResourcePage;
