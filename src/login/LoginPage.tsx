import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken } from "../utils/AuthUtils";

const LoginPage = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://reqres.in/api/login", { email, password });
      const token = response.data.token;
      
      if (token) {
        setToken(token); 
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        navigate("/users"); 
      }
    } catch (err) {
        console.error("login error:", err)
      setError("Invalid UserName or Password. Please try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" mb={2}>Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
      <TextField fullWidth type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
      <Button fullWidth variant="contained" onClick={handleLogin} sx={{ mt: 2 }}>Login</Button>
    </Box>
  );
};

export default LoginPage;
