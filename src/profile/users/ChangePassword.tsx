import { useState } from "react";
import { Button, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

const ChangePasswordPage = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onSubmit = (data: { newPassword: string; confirmPassword: string }) => {
    if (data.newPassword !== data.confirmPassword) {
      return;
    }
    setOpenSnackbar(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Change Password
      </Typography>

      
      <Controller
        name="newPassword"
        control={control}
        rules={{ required: "New password is required" }}
        render={({ field }) => (
          <TextField
            label="New Password"
            type="password"
            fullWidth
            {...field}
            sx={{ my: 2 }}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />
        )}
      />

      
      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: "Confirm password is required",
          validate: (value) => value === watch("newPassword") || "Passwords do not match",
        }}
        render={({ field }) => (
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            {...field}
            sx={{ my: 2 }}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        )}
      />

      <Button type="submit" variant="contained">
        Update Password
      </Button>

      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          Password updated successfully!
        </Alert>
      </Snackbar>
    </form>
  );
};

export default ChangePasswordPage;
