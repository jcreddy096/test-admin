import { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import {addUser,  getUserById, updateUser } from "../../api/userApi";

type UserFormProps = {
  userId: number | null;
  onSuccess: () => void;
};

const UserForm = ({ userId, onSuccess }: UserFormProps) => {
  const [userData, setUserData] = useState({ first_name: "", last_name: "", email: "", avatar: "" });

  useEffect(() => {
    if (userId) {
      getUserById(userId).then((res) => setUserData(res.data.data));
    }
  }, [userId]);

  const handleSubmit = () => {
    if (userId) {
      updateUser(userId, userData).then(onSuccess);
    } else {
      addUser(userData).then(onSuccess);
    }
  };

  return (
    <form>
      <TextField label="First Name" fullWidth value={userData.first_name} onChange={(e) => setUserData({ ...userData, first_name: e.target.value })} />
      <TextField label="Last Name" fullWidth value={userData.last_name} onChange={(e) => setUserData({ ...userData, last_name: e.target.value })} />
      <TextField label="Email" fullWidth value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
      <Button onClick={handleSubmit} variant="contained" color="primary">Save</Button>
    </form>
  );
};

export default UserForm;



