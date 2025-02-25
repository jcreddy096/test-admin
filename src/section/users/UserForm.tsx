
import { TextField, Button, Box } from "@mui/material";
import { addUser, getUserById, updateUser } from "../../api/uses";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import UserType from "../../types/users/Schema";

type UserFormProps = {
  userId: number | null;
  onSuccess: () => void;
};

const UserForm = ({ userId, onSuccess }: UserFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    
  } = useForm<UserType>();

  useEffect(() => {
    if (userId) {
      getUserById(userId)
        .then((res) => {
          const { id, first_name, last_name, email, avatar } = res.data.data;
          setValue("id", id);
          setValue("first_name", first_name);
          setValue("last_name", last_name);
          setValue("email", email);
          setValue("avatar", avatar);
        })
        .catch(() => {});
    } else {
      reset();
    }
  }, [userId, setValue, reset]);

  const onSubmit = async (data: UserType) => {
    try {
      if (userId) {
        await updateUser(userId, data);
        toast.success("User updated successfully!");
      } else {
        await addUser(data);
        toast.success("User added successfully!");
      }
      onSuccess();
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const fields = [
    { name: "id", label: "ID", required: "ID is required" },
    { name: "avatar", label: "Avatar", required: "Avatar is required" },
    { name: "first_name", label: "First Name", required: "First name is required" },
    { name: "last_name", label: "Last Name", required: "Last name is required" },
    { name: "email", label: "Email", required: "Email is required" },
  ];

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 0, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <Box key={field.name} sx={{ mb: 2 }}>
            <Controller
              name={field.name as keyof UserType}
              control={control}
              defaultValue=""
              rules={{ required: field.required }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label={field.label}
                  fullWidth
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
          </Box>
        ))}
        <Box sx={{ textAlign: "center" }}>
          <Button type="submit" variant="contained" color="primary">
            {userId ? "Update" : "Submit"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UserForm;
