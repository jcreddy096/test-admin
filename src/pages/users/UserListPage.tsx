
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // ✅ Import useSearchParams
import { getUsers, deleteUser } from "../../api/userApi";
import UserType from "../../types/Schema";
import { Button } from "@mui/material";
import UserTable from "../../section/users/UserTable";
import PaginationComponent from "../../components/common/Pagination";

const UserListPage = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams(); // ✅ Use this
  const navigate = useNavigate();

  const page = Number(searchParams.get("page")) || 1; // ✅ Only declared once

  const fetchUsers = useCallback(() => {
    getUsers(page, 5).then((res) => setUsers(res.data.data));
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handlePageChange = (_e: any, value: number) => {
    setSearchParams({ page: value.toString() });
  };

  return (
    <div>
      <h1>Users</h1>
      <Button variant="contained" color="primary" onClick={() => navigate("/users/add")}>
        Add User
      </Button>
      <UserTable users={users} onEdit={(id) => navigate(`/users/edit/${id}`)} onDelete={handleDelete} />
      <PaginationComponent count={3} page={page} onChange={handlePageChange} />
    </div>
  );
};

export default UserListPage;
