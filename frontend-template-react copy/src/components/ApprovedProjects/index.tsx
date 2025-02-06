import React, { Suspense, lazy } from "react";
import { Grid, Box, Typography, Skeleton, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import { useGetAllProjectsQuery } from "../../services/apiSlice";

const ProjectCard = lazy(() => import("../../components/ProjectCard.tsx"));

const ApprovedProjects: React.FC = () => {
  const { data, isLoading, isError } = useGetAllProjectsQuery();
  const projects = Array.isArray(data) ? data : data?.data || [];
  const approvedProjects = projects.filter((project: any) => project.isVerified === "approved");
  const DEFAULT_IMAGE = "/assets/loginBackground.jpg";
  
  const navigate = useNavigate(); // Initialize navigate function

  // Function to navigate to the "Sell Project" page
  const handleSellProject = () => {
    navigate("/upload-file"); // Redirect to "/upload-file" route
  };

  if (isLoading) {
    return (
      <Box sx={{ width: "100%", padding: "16px" }}>
        <Grid container spacing={2}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rectangular" width="100%" height={200} />
              <Skeleton variant="text" sx={{ mt: 1, width: "80%" }} />
              <Skeleton variant="text" sx={{ width: "60%" }} />
              <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 1 }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (isError) {
    return <Typography>Error fetching approved projects. Please try again later.</Typography>;
  }

  return (
    <Box sx={{ width: "100%", padding: "16px" }}>
      <Grid container spacing={2}>
        {approvedProjects.length === 0 ? (
          <Typography>No approved projects available for purchase.</Typography>
        ) : (
          <Suspense
            fallback={
              <Grid container spacing={2}>
                {[...Array(6)].map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Skeleton variant="rectangular" width="100%" height={200} />
                    <Skeleton variant="text" sx={{ mt: 1, width: "80%" }} />
                    <Skeleton variant="text" sx={{ width: "60%" }} />
                    <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 1 }} />
                  </Grid>
                ))}
              </Grid>
            }
          >
            {approvedProjects.map((project: any) => (
              <Grid item xs={12} sm={6} md={4} key={project._id}>
                <ProjectCard
                  project={{
                    ...project,
                    imageUrl: project.imageUrl || DEFAULT_IMAGE, // Set default image if no image
                  }}
                />
                {/* "Sell Project" button */}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                  onClick={handleSellProject} // Trigger the navigation when clicked
                >
                  Sell Project
                </Button>
              </Grid>
            ))}
          </Suspense>
        )}
      </Grid>
    </Box>
  );
};

export default ApprovedProjects;
