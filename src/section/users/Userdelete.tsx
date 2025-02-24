import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { deleteUser } from "../../api/userApi";
import { toast } from "react-toastify";

type UserDeleteProps = {
  userId: number | null;
  onClose: () => void;
  onSuccess: () => void;
};

const UserDelete = ({ userId, onClose, onSuccess }: UserDeleteProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      await deleteUser(userId); 
      toast.success("User deleted successfully!");
      onSuccess();
    } catch  { 
      toast.error("Failed to delete user.");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={Boolean(userId)} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this user?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained" disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDelete;
