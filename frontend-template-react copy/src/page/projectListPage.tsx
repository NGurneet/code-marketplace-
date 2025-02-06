import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useGetAllProjectsQuery } from "../services/apiSlice";
import ProjectsTable from "../components/ProjectTable";
import { useNavigate } from "react-router-dom";

const ProjectsList: React.FC = () => {
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
        <ProjectsTable projects={projects} onGetDetails={handleGetDetails} />
      )}
    </Box>
  );
};

export default ProjectsList;
