import { Table, TableBody, TableCell, TableHead, TableRow, Avatar, IconButton } from "@mui/material";
import  UserType  from "../../types/Schema";
import { Delete, Edit } from "@mui/icons-material";

type UserTableProps = {
  users: UserType[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const UserTable = ({ users, onEdit, onDelete }: UserTableProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Avatar</TableCell>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <Avatar src={user.avatar} />
            </TableCell>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.first_name} {user.last_name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
            <IconButton color="primary" onClick={() => onEdit(user.id)}> 
                <Edit /> 
              </IconButton>
              <IconButton color="secondary" onClick={() => onDelete(user.id)}>
                <Delete /> 
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
