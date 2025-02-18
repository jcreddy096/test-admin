import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Brand {
  id: string;
  title: string;
  active: boolean;
}

interface Props {
  brands: Brand[];
  onEdit: (brand: Brand) => void;
  onDelete: (id: string) => void;
}

const BrandTable: React.FC<Props> = ({ brands, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {brands.map((brand, index) => (
            <TableRow key={brand.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{brand.title}</TableCell>
              <TableCell>{brand.active ? "Active" : "Inactive"}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(brand)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(brand.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BrandTable;


