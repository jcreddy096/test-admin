import { useNavigate, useParams } from "react-router-dom";
import { addBrand, updateBrand } from "../services/api";
import BrandForm from "../components/BrandForm";

const AddEditBrand = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (data: { title: string; active: boolean }) => {
    if (id) {
      await updateBrand(id, data) ;
    } else{ 
      await addBrand(data);
    }
    navigate("/brands");
  };

  return <BrandForm onSubmit={handleSubmit} />;
};

export default AddEditBrand;
