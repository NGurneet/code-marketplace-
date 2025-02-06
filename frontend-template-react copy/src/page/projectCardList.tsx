import React from "react";
import { Box, Typography, CircularProgress, Card, CardContent, CardMedia, Button, Grid } from "@mui/material";
import { useGetAllProjectsQuery } from "../services/apiSlice";
import { useNavigate } from "react-router-dom";

const ProjectsCardList: React.FC = () => {
  const { data, isLoading, isError } = useGetAllProjectsQuery();
  const navigate = useNavigate();

  // Ensure data is an array
  const projects = Array.isArray(data) ? data : data?.data || [];

  const handleGetDetails = (projectId: string) => {
    navigate(`/project/${projectId}`);
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
      {projects.length === 0 ? (
        <Typography>No projects available</Typography>
      ) : (
        <Grid container spacing={2}>
          {projects.map((project: any) => (
            <Grid item xs={12} sm={6} md={4} key={project._id}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={project.image || "https://via.placeholder.com/150"} // Use a placeholder if no image
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
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProjectsCardList;
