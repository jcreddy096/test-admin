import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Box } from "@mui/material";
import ResourceType from "../../types/resource/schema";
import { Delete, Edit } from "@mui/icons-material";

type ResourceTableProps = {
  resources: ResourceType[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const ResourceTable = ({ resources, onEdit, onDelete }: ResourceTableProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Year</TableCell>
          <TableCell>Color</TableCell>
          <TableCell>Pantone Value</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {resources.map((resource) => (
          <TableRow key={resource.id}>
            <TableCell>{resource.id}</TableCell>
            <TableCell>{resource.name}</TableCell>
            <TableCell>{resource.year}</TableCell>
            <TableCell>
              <Box style={{ backgroundColor: resource.color, width: '24px', height: '24px' }} />
            </TableCell>
            <TableCell>{resource.pantone_value}</TableCell>
            <TableCell>
              <IconButton color="primary" onClick={() => onEdit(resource.id)}> 
                <Edit /> 
              </IconButton>
              <IconButton color="secondary" onClick={() => onDelete(resource.id)}>
                <Delete /> 
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ResourceTable;
