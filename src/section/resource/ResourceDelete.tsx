import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { deleteResource } from "../../api/resource"; 
import { toast } from "react-toastify";

type ResourceDeleteProps = {
  resourceId: number | null;
  resource: string; 
  onClose: () => void;
  onSuccess: () => void;
};

const ResourceDelete = ({ resourceId, resource, onClose, onSuccess }: ResourceDeleteProps) => {

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!resourceId ) return;

    try {
      setLoading(true);
      await deleteResource(resource, resourceId); 
      toast.success("Resource deleted successfully!");
      onSuccess();
    } catch  { 
      toast.error("Failed to delete resource.");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={Boolean(resourceId)} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this resource?</Typography>
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

export default ResourceDelete;
