import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

type PaginationProps = {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

const PaginationComponent = ({ count, page, onChange }: PaginationProps) => {
  return (
    <Stack spacing={2}>
      <Pagination count={count} page={page} onChange={onChange} variant="outlined" color="primary" />
    </Stack>
  );
};

export default PaginationComponent;
