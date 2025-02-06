import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const handlePurchase = () => {
    console.log("Purchase clicked for project:", project.id);
    // Implement the logic to handle the purchase of the project
  };

  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="140"
        image={project.imageUrl || "https://via.placeholder.com/345x140"}
        alt={project.title}
      />
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          {project.description}
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Price: ${project.price}
          
        </Typography>
        
        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePurchase}
            fullWidth
            sx={{ borderRadius: 2 }}
          >
            Purchase
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
