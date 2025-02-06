import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Tooltip,
} from "@mui/material";
import { useGetUserbyIdQuery } from "../../services/apiSlice"; // Assuming getUserById query exists
import theme from "../../theme";

interface Project {
  _id: string;
  title: string;
  sellerId: string;
  price: number;
}

interface ProjectsTableProps {
  projects: Project[];
  onGetDetails: (projectId: string) => void;
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const ProjectsTable: React.FC<ProjectsTableProps> = ({ projects, onGetDetails }) => {
  const [sellerNames, setSellerNames] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchSellerNames = async () => {
      const names: Record<string, string> = {};
      for (const project of projects) {
        // Fetch seller details for each project
        const sellerId = project.sellerId;
        console.log("sellerId: ", project?.sellerId);
        const { data:sellerData, error } = await useGetUserbyIdQuery(project?.sellerId);
        const seller = Array.isArray(sellerData) ? sellerData[0] : sellerData?.data || sellerData;
        console.log("data: ", seller);
        if (seller) {

          names[project.sellerId] = seller?.name; // Assuming the name is in `data.name`
        } else {
          names[project.sellerId] = "Unknown"; // In case of an error
        }
      }
      setSellerNames(names); // Set the fetched names in state
    };

    if (projects.length > 0) {
      fetchSellerNames();
    }
  }, [projects]);

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
      <Table>
        <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
          <TableRow>
            <TableCell><strong>Title</strong></TableCell>
            <TableCell><strong>Seller</strong></TableCell>
            <TableCell><strong>Price ($)</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project._id} hover>
              <TableCell>
                <Tooltip title={project.title} arrow>
                  <span>{truncateText(project.title, 20)}</span>
                </Tooltip>
              </TableCell>
              <TableCell>{sellerNames[project.sellerId] || "Unknown"}</TableCell>
              <TableCell>${project.price.toFixed(2)}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onGetDetails(project._id)}
                >
                  Get Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectsTable;
