import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; 
import { getUsers } from "../../api/userApi";
import UserType from "../../types/Schema";
import { Button } from "@mui/material";
import UserTable from "../../components/users/UserTable";
import PaginationComponent from "../../components/common/Pagination";
import UserDelete from "../../section/users/Userdelete";

const UserListPage = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams(); 
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  const page = Number(searchParams.get("page")) || 1; 

  const fetchUsers = useCallback(() => {
    getUsers(page, 5)
      .then((res) => { 
        setUsers(res.data.data);
      })
      .catch((error) => console.error("Error fetching users:", error)); 
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteSuccess = () => {
    fetchUsers();
    setDeleteUserId(null);
  };

  const handlePageChange = (_e: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({ page: value.toString() });
  };

  return (
    <div>
      <h1>Users</h1>
      <Button variant="contained" color="primary" onClick={() => navigate("/users/add")}>
        Add User
      </Button>
      
      <UserTable
        users={users}
        onEdit={(id) => navigate(`/users/edit/${id}`)}
        onDelete={(id) => setDeleteUserId(id)} 
      />

      <PaginationComponent count={3} page={page} onChange={handlePageChange} />

      <UserDelete userId={deleteUserId} onClose={() => setDeleteUserId(null)} onSuccess={handleDeleteSuccess} />
    </div>
  );
};

export default UserListPage;
