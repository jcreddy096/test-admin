import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";

type PaginationProps = {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

const PaginationComponent = ({ count, page, onChange }: PaginationProps) => {
  return (
    <Box display= "flex" justifyContent= "center" mt={3}>
    <Stack spacing={2}>
      <Pagination count={count} page={page} onChange={onChange} variant="outlined" color="primary" />
    </Stack>
    </Box>
  );
};

export default PaginationComponent;
