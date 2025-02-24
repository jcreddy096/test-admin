
import { TextField, Button } from "@mui/material";
import { addUser, getUserById, updateUser } from "../../api/userApi";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

type UserFormProps = {
  userId: number | null;
  onSuccess: () => void;
};

const UserForm = ({ userId, onSuccess }: UserFormProps) => {
  const [userData, setUserData] = useState({ first_name: "", last_name: "", email: "", avatar: "" });

  useEffect(() => {
    if (userId) {
      getUserById(userId)
        .then((res) => {
          setUserData(res.data.data);
        })
        .catch (()=> {})}
  }, [userId]);

  const handleSubmit = async () => {
    try {
      if (userId) {
         await updateUser(userId, userData);
        toast.success("User updated successfully!"); 
      } else {
         await addUser(userData);
        toast.success("User added successfully!"); 
      } 
      onSuccess();
    } catch  {
      toast.error("Something went wrong!");
    }
  };

  return (
    <form>
      <TextField
        label="First Name"
        fullWidth
        value={userData.first_name}
        onChange={(e) => setUserData({ ...userData, first_name: e.target.value })}
      />
      <TextField
        label="Last Name"
        fullWidth
        value={userData.last_name}
        onChange={(e) => setUserData({ ...userData, last_name: e.target.value })}
      />
      <TextField
        label="Email"
        fullWidth
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <Button onClick={handleSubmit} variant="contained" color="primary">
        {userId ? "Update" : "Add"}
      </Button>
    </form>
  );
};

export default UserForm;
