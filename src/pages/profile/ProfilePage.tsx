import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm, Controller, useWatch } from "react-hook-form";
import ChangePasswordPage from "./ChnagePassword"; 

const ProfilePage = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("User");
  const [tabIndex, setTabIndex] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  

  const getAvatarLetter = (name: string) => {
    const words = name.trim().split(" ");
    if (words.length > 1) {
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }

  

    return name.charAt(0).toUpperCase();
  };

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: name,
      email: email,
    },
  });

  const watchedName = useWatch({ control, name: "name" });

  const onSubmit = () => {
    setOpenSnackbar(true); 
  };

  useEffect(() => {
    setValue("name", name);
    setValue("email", email);
  }, [name, email, setValue]);

 
      
  useEffect(() => {
    const storedEmail = localStorage.getItem("email") || "user@example.com";
    setEmail(storedEmail);
    setName(storedEmail.split("@")[0]);
  }, []);


  return (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ my: 3 }}>
        User Profile
      </Typography>

      <Tabs value={tabIndex} onChange={(_, newIndex) => setTabIndex(newIndex)} sx={{ mb: 2 }}>
        <Tab label="General" />
        <Tab label="Change Password" />
      </Tabs>

      {tabIndex === 0 && (
        <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
          
          <Paper elevation={3} sx={{ p: 3, display: "flex", justifyContent: "center", alignItems: "center", width: "30%" }}>
            <Avatar sx={{ bgcolor: "orange", width: 100, height: 100, fontSize: 40 }}>
              {getAvatarLetter(watchedName)}
            </Avatar>
          </Paper>

          
          <Paper elevation={3} sx={{ p: 3, flex: 1 }}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField label="Name" fullWidth {...field} margin="normal" />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField label="Email" fullWidth {...field} margin="normal" disabled />
                )}
              />
              <Box  sx={{textAlign: "right"}} >
              <Button type="submit"   variant="contained"  sx={{ mt: 2 }}>
                Save
              </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}

      {tabIndex === 1 && (
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <ChangePasswordPage />
        </Paper>
      )}

      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfilePage;
