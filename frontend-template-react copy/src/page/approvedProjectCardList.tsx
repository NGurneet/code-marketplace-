import React from "react";
import { Box, Typography, CircularProgress, Card, CardContent, CardMedia, Button, Grid } from "@mui/material";
import { useGetAllProjectsQuery } from "../services/apiSlice";
import { useNavigate } from "react-router-dom";

const ApprovedProjectsCardList: React.FC = () => {
  const { data, isLoading, isError } = useGetAllProjectsQuery();
  const navigate = useNavigate();
  const DEFAULT_IMAGE = "/assets/loginBackground.jpg";
  // Ensure data is an array and filter out projects that are approved
  const projects = Array.isArray(data) ? data : data?.data || [];
  const approvedProjects = projects.filter((project: any) => project.isVerified === "approved");

  const handleGetDetails = (projectId: string) => {
    navigate(`/purchase-project/${projectId}`);
  };

  const handleSellProject = () => {
    navigate("/upload-file"); // Navigate to the /upload-file route
  };

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 4 }}>
        Error fetching projects. Please try again later.
      </Typography>
    );

  return (
    <Box sx={{ width: "100%", padding: "16px" }}>
      {approvedProjects.length === 0 ? (
        <Typography>No approved projects available</Typography>
      ) : (
        <Grid container spacing={2}>
          {approvedProjects.map((project: any) => (
            <Grid item xs={12} sm={6} md={4} key={project._id}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={project.image || DEFAULT_IMAGE} // Use a placeholder if no image
                  alt={project.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {project.description}
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => handleGetDetails(project._id)}>
                    Purchase
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* "Sell Project" Button outside of the project grid */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button variant="contained" color="secondary" onClick={handleSellProject}>
          Sell Your Project
        </Button>
      </Box>
    </Box>
  );
};

export default ApprovedProjectsCardList;
