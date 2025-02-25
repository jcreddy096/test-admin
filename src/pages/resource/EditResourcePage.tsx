// import { useParams, useNavigate } from "react-router-dom";
// import ResourceForm from "../../section/resource/ResourceForm";
// import { Container, Typography } from "@mui/material";

// const EditResourcePage = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const resourceId = id ? Number(id) : null;

//   if(!resourceId) {
//     return <Typography align="center">Invalid Resource ID</Typography>
//   }

//   return (
//     <Container maxWidth="sm" sx={{ mt: 4 }}>
//       <Typography variant="h5" 
//      align="center" gutterBottom>Edit Resource</Typography>
//       <ResourceForm resourceId={Number(id)} onSuccess={() => navigate("/resource")} resource={""} />
     
//     </Container>
//   );
// };

// export default EditResourcePage;


import { useParams, useNavigate } from "react-router-dom";
import ResourceForm from "../../section/resource/ResourceForm";
import { Container, Typography } from "@mui/material";

const EditResourcePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Edit Resource
      </Typography>
      <ResourceForm resourceId={id ? Number(id) : null} onSuccess={() => navigate("/resource")} resource="resource" />
    </Container>
  );
};

export default EditResourcePage;
