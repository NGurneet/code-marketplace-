import React from "react";
import { Box, Typography, CircularProgress, Card, CardContent, CardMedia, Button, Grid, Container } from "@mui/material";
import { useGetAllProjectsQuery } from "../services/apiSlice";
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const { data, isLoading, isError } = useGetAllProjectsQuery();
  const navigate = useNavigate();
  const DEFAULT_IMAGE = "/assets/loginBackground.jpg";

  const projects = Array.isArray(data) ? data : data?.data || [];
  const approvedProjects = projects.filter((project: any) => project.isVerified === "approved");

  const handleGetDetails = (projectId: string) => {
    navigate(`/purchase-project/${projectId}`);
  };

  const handleSellProject = () => {
    navigate("/upload-file");
  };

  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h3" color="primary" gutterBottom>
          Sell Your Project Today!
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Turn your source code into profit. Upload and sell your projects now!
        </Typography>
        <Button variant="contained" color="secondary" size="large" onClick={handleSellProject}>
          Get Started
        </Button>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Explore Approved Projects
        </Typography>

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Typography color="error" sx={{ textAlign: "center", mt: 4 }}>
            Error fetching projects. Please try again later.
          </Typography>
        )}

        {!isLoading && !isError && (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {approvedProjects.map((project: any) => (
              <Grid item xs={12} sm={6} md={4} key={project._id}>
                <Card sx={{ height: "100%" }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={project.image || DEFAULT_IMAGE}
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
      </Box>
    </Container>
  );
};

export default WelcomePage;
