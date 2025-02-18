import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Home Page
      </Typography>
      <Button variant="contained" onClick={() => navigate("/brands")}>
        Go to Brand List
      </Button>
    </Container>
  );
};

export default HomePage;
