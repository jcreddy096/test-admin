import { TextField, Button, Box } from "@mui/material";
import { addResource, getResourceById, updateResource } from "../../api/resource";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { resourceSchema, ResourceType} from "../../types/resource/schema";

type ResourceFormProps = {
  resourceId: number | null;
  resource: string;
  onSuccess: () => void;
};


  const ResourceForm = ({ resourceId, resource, onSuccess }: ResourceFormProps) => {
    const { control, handleSubmit, setValue } = useForm<ResourceType>({
      defaultValues: {
        name: "",
        year: undefined,
        color: "",
        pantone_value: "",
      },
    });
    
  const onSubmit = async (data: ResourceType) => {
    try {
      if (resourceId) {
        await updateResource(resource, resourceId, data);
        toast.success("Resource updated successfully!");
      } else {
        await addResource(resource, data);
        toast.success("Resource added successfully!");
      }
      onSuccess();
    } catch (error) {
      console.error("Error updating resource:", error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (!resourceId) return;
  
    const fetchData = async () => {
      try {
        const res = await getResourceById(resource, resourceId);
        if (res.data?.data) {
          setValue("name", res.data.data.name || "");
          setValue("year", res.data.data.year || 0);
          setValue("color", res.data.data.color || "");
          setValue("pantone_value", res.data.data.pantone_value || "");
        }
      } catch {
        toast.error("Failed to fetch resource data");
      }
    };
  
    fetchData();
  }, [resource, resourceId, setValue]); 
  
 

  
  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 0, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(resourceSchema.shape).map((key) => (
          <Box key={key} sx={{ mb: 2 }}>
            <Controller
              name={key as keyof ResourceType}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Box>
        ))}
        <Box sx={{ textAlign: "center" }}>
          <Button type="submit" variant="contained" color="primary">
            {resourceId ? "Update" : "Submit"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ResourceForm;
