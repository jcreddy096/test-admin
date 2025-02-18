
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchBrands, deleteBrand } from "../services/api";
import {
  Button,
  TextField,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Pagination,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

type Brand = {
  id: string;
  title: string;
  active: boolean;

};



const BrandList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [search, setSearch] = useState(params.get("search") || "");
  const [filter, setFilter] = useState<"all" | "active" | "inactive">(
    (params.get("filter") as "all" | "active" | "inactive") || "all"
  );
  const [brands, setBrands] = useState<Brand[]>([]);
  const [currentPage, setCurrentPage] = useState(Number(params.get("page")) || 1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBrands();
      setBrands(data.findBrands.brands);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (filter !== "all") params.set("filter", filter);
    if (currentPage !== 1) params.set("page", currentPage.toString());
    navigate(`/brands?${params.toString()}`, { replace: true });
  }, [search, filter, currentPage, navigate]);

  const handleDelete = async (id: string) => {
    await deleteBrand(id);
    setBrands(brands.filter((brand) => brand.id !== id));
  };

  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1); 
  };

  const filteredBrands = brands
    .filter((b) => b.title.toLowerCase().includes(search.toLowerCase()))
    .filter(
      (b) =>
        filter === "all" ||
        (filter === "active" && b.active) ||
        (filter === "inactive" && !b.active)
    );

  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);
  const paginatedBrands = filteredBrands.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    
    







    
    <div style={{ padding: "30px", maxWidth: "1100px", margin: "auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <TextField
          placeholder="Search..."
          variant="outlined"
          value={search}
          onChange={handleSearchChange} 
          fullWidth
          style={{ marginRight: "10px", borderRadius: "8px" }}
        />
        <Button
          variant="contained"
          style={{
            backgroundColor: "#6C4AB6",
            color: "#fff",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px",
          }}
          onClick={() => {
            navigate("/brand/add")} }
        >
          + New Brand
        </Button>
      </div>

      <Tabs
        value={filter}
        onChange={(_, newFilter) => {
          setFilter(newFilter);
          setCurrentPage(1);
        }}
        textColor="primary"
        indicatorColor="primary"
        style={{ marginBottom: "10px" }}
      >
        <Tab label={`All (${brands.length})`} value="all" style={{ fontWeight: "bold", textTransform: "none" }} />
        <Tab
          label={`Active (${brands.filter((b) => b.active).length})`}
          value="active"
          style={{ fontWeight: "bold", textTransform: "none" }}
        />
        <Tab
          label={`Inactive (${brands.filter((b) => !b.active).length})`}
          value="inactive"
          style={{ fontWeight: "bold", textTransform: "none" }}
        />
      </Tabs>

      <Paper style={{ borderRadius: "10px", overflow: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow style={{ background: "#f8f9fa" }}>
              <TableCell style={{ fontWeight: "bold" }}>No.</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Active</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBrands.map((brand, index) => (
              <TableRow key={brand.id}>
                <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                <TableCell>{brand.title}</TableCell>
                <TableCell
                  style={{
                    color: brand.active ? "#28a745" : "#dc3545",
                    fontWeight: "bold",
                  }}
                >
                  {brand.active ? "Active" : "Inactive"}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`/brand/edit/${brand.id}`)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(brand.id)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {totalPages > 1 && brands.length > 0 &&(
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          color="primary"
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        />
      )}
    </div>
  );
};

export default BrandList;




