import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Button, Skeleton, Card, CardContent, CardActions, CardMedia } from "@mui/material";
import { useGetProjectsByIdQuery, useUpdateProjectStatusMutation } from "../services/apiSlice"; 
import { useGetUserbyIdQuery } from "../services/apiSlice";

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: projectData, isLoading, isError, error } = useGetProjectsByIdQuery(id);
  
  // Ensure data is in the expected format
  const project = Array.isArray(projectData) ? projectData[0] : projectData?.data || projectData;

  const { data: sellerData, isLoading: isSellerLoading } = useGetUserbyIdQuery(project?.sellerId);
  const seller = Array.isArray(sellerData) ? sellerData[0] : sellerData?.data || sellerData;

  const [updateProjectStatus] = useUpdateProjectStatusMutation();

  const handleStatusChange = (isVerified: "approved" | "rejected") => {
    if (id) {
      updateProjectStatus({ id: id, isVerified });
    }
  };

  if (isLoading || isSellerLoading) {
    return (
      <Box sx={{ padding: 2 }}>
        <Skeleton variant="rectangular" width="100%" height={200} sx={{ marginBottom: 2 }} />
        <Skeleton variant="text" width="60%" sx={{ marginBottom: 1 }} />
        <Skeleton variant="text" width="40%" sx={{ marginBottom: 1 }} />
        <Skeleton variant="text" width="80%" sx={{ marginBottom: 2 }} />
        <Skeleton variant="text" width="50%" />
      </Box>
    );
  }

  if (isError) return <Typography color="error">Error: { "An error occurred"}</Typography>;

  return (
    <Box sx={{ padding: 2 }}>
      <Card sx={{ maxWidth: 600, margin: "auto", boxShadow: 3 }}>
        {/* Lazy Loading of Image */}
        <CardMedia
          component="img"
          height="200"
          image={project?.image || "/placeholder.jpg"} // Placeholder image if no project image
          alt={project?.title || "Project Image"}
          loading="lazy"
        />
        
        <CardContent>
          <Typography variant="h5" component="div">{project?.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
            {project?.description || "No description available"}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ marginBottom: 1 }}>
            Price: ${project?.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Seller: {seller?.name || "Loading..."}
          </Typography>
          
          {/* ZIP File URL for viewing or downloading */}
          {project?.zipFile && (
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="body2">Download ZIP File:</Typography>
              <Button
                variant="outlined"
                color="primary"
                href={project.zipFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ marginTop: 1 }}
              >
                Download ZIP
              </Button>
            </Box>
          )}
        </CardContent>

        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleStatusChange("approved")}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleStatusChange("rejected")}
          >
            Reject
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProjectDetail;
