
import { TextField, Button } from "@mui/material";
import { addUser, getUserById, updateUser } from "../../api/userApi";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import UserType from "../../types/Schema";

type UserFormProps = {
  userId: number | null;
  onSuccess: () => void;
};

const UserForm = ({ userId, onSuccess }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UserType>();

  useEffect(() => {
    if (userId) {
      getUserById(userId)
        .then((res) => {
          const { first_name, last_name, email, avatar } = res.data.data;
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="First Name"
        fullWidth
        {...register("first_name", { required: "First name is required" })}
        error={!!errors.first_name}
        helperText={errors.first_name?.message}
      />
      <TextField
        label="Last Name"
        fullWidth
        {...register("last_name", { required: "Last name is required" })}
        error={!!errors.last_name}
        helperText={errors.last_name?.message}
      />
      <TextField
        label="Email"
        fullWidth
        {...register("email", { required: "Email is required" })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <Button type="submit" variant="contained" color="primary">
        {userId ? "Update" : "Add"}
      </Button>
    </form>
  );
};

export default UserForm;
