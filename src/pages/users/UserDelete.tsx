import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUser } from "../../api/userApi";

const UserDelete = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    deleteUser(Number(id)).then(() => navigate("/users"));
  }, [id, navigate]);

  return <p>Deleting user...</p>;
};

export default UserDelete;
