import { useState } from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Box,
  Typography,
  Tabs,
  Tab,
  Breadcrumbs,
  Link,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

interface Props {
  initialData?: { title: string; active: boolean; image?: File | null };
  onSubmit: (data: { title: string; active: boolean; image?: File | null }) => void;
}

const BrandForm: React.FC<Props> = ({ initialData = { title: "", active: true, image: null }, onSubmit }) => {
  const [title, setTitle] = useState(initialData.title);
  const [active, setActive] = useState(initialData.active);
  const [image, setImage] = useState<File | null>(initialData.image || null);
  const [tabIndex, setTabIndex] = useState(0); 

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <Box sx={{ maxWidth: "600px", margin: "auto", mt: 2 }}>
      
      <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
          Home
        </Link>

        <Link underline="hover" color="inherit" href="/brands">
          Brands
        </Link>
        <Typography color="text.primary">Add Brand</Typography>
      </Breadcrumbs>

      <Tabs value={tabIndex} onChange={(_event, newValue) => setTabIndex(newValue)} sx={{ mt: 2 }}>
        <Tab label="General" />
  
      </Tabs>

      {tabIndex === 0 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ title, active, image });
          }}
          style={{ marginTop: "20px" }}
        >
          
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add Brand
          </Typography>

        
          <Box
            sx={{
              border: "2px dashed #B0B0B0",
              borderRadius: "8px",
              width: "100%",
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              cursor: "pointer",
              "&:hover": { borderColor: "#7B61FF" },
            }}
          >
            <input
              type="file"
              hidden
              id="upload-image"
              onChange={handleImageChange}
              accept="image/*"
            />
            <label htmlFor="upload-image">
              <Box display="flex" flexDirection="column" alignItems="center" component="span">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded"
                    style={{ maxWidth: "100%", maxHeight: "150px", borderRadius: "8px" }}
                  />
                ) : (
                  <>
                    <AddPhotoAlternateIcon fontSize="large" sx={{ color: "#7B61FF" }} />
                    <Typography variant="body1" color="textSecondary">
                      + Add Image
                    </Typography>
                  </>
                )}
              </Box>
            </label>
          </Box>

        
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            sx={{ mt: 2 }}
          />

          <FormControlLabel
            control={<Switch checked={active} onChange={(e) => setActive(e.target.checked)} />}
            label="Active"
            sx={{ mt: 2 }}
          />

          <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" sx={{ backgroundColor: "#7B61FF" }}>
              Submit
            </Button>
          </Box>
        </form>
      )}

    
      {tabIndex === 1 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1">Other brand-related settings can be added here.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default BrandForm;
