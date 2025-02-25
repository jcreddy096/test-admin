import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom"; 
import { getResources } from "../../api/resource"; 
import { ResourceType } from "../../types/resource/schema"; 
import { Box, Button } from "@mui/material";
import ResourceTable from "../../components/resource/ResourceTable"; 
import PaginationComponent from "../../components/common/Pagination";
import ResourceDelete from "../../section/resource/ResourceDelete";

const ResourceListPage = ({ resource }: { resource: string }) => {
  const [resources, setResources] = useState<ResourceType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams(); 
  const [deleteResourceId, setDeleteResourceId] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const page = Number(searchParams.get("page")) || 1; 

  
  const fetchResources = useCallback(() => {
    setLoading(true);
    getResources(resource, page, 5)
      .then((res) => { 
        setResources(res.data.data);
      })
      .catch((error) => console.error("Error fetching resources:", error))
      .finally(() => setLoading(false)); 
  }, [resource, page]);

  
  const handleDeleteSuccess = () => {
    fetchResources();
    setDeleteResourceId(null);
  };

  const handlePageChange = (_e: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({ page: value.toString() });
  };

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);


  useEffect(() => {
    const lowercasePath = location.pathname.toLowerCase();
    if (location.pathname !== lowercasePath) {
      navigate(lowercasePath, { replace: true });
    }
  }, [location, navigate]);

  return (
     <Box display="flex" flexDirection="column" alignItems="center">
      <h1>{resource.charAt(0).toUpperCase() + resource.slice(1)}</h1>
      
      <Box alignSelf="flex-end">
      <Button variant="contained" color="primary" onClick={() => navigate(`/resource/add`)}>
        Add {resource.charAt(0).toUpperCase() + resource.slice(1)}
      </Button>
      </Box>
      
      {loading ? (
        <Box style={{ textAlign: "center", margin: "20px 0" }}>
          Loading... 
        </Box>
      ) : (
        <>
          <ResourceTable
            resources={resources}
            onEdit={(id) => navigate(`/resource/edit/${id}`)}
            onDelete={(id) => setDeleteResourceId(id)} 
          />

          <PaginationComponent count={3} page={page} onChange={handlePageChange} />
        </>
      )}

      <ResourceDelete resourceId={deleteResourceId}
       onClose={() => setDeleteResourceId(null)}
       onSuccess={handleDeleteSuccess} 
       resource={resource} />
    </Box>
  );
};

export default ResourceListPage;
