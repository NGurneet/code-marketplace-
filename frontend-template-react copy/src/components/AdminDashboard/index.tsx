import React from "react";
import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import GroupIcon from "@mui/icons-material/Group";
import VerifiedIcon from "@mui/icons-material/Verified";
import SettingsIcon from "@mui/icons-material/Settings";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const dashboardItems = [
    { title: "User Management", icon: <GroupIcon />, route: "/admin/users" },
    { title: "Project Approvals", icon: <VerifiedIcon />, route: "/admin/projects" },
    { title: "Transactions & Earnings", icon: <MonetizationOnIcon />, route: "/admin/transactions" },
    { title: "Analytics & Reports", icon: <AnalyticsIcon />, route: "/admin/analytics" },
    { title: "Settings", icon: <SettingsIcon />, route: "/admin/settings" },
  ];

  return (
    <Box sx={{ width: "100%", padding: "16px" }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>Admin Dashboard</Typography>
      <Grid container spacing={2} justifyContent="center">
        {dashboardItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ textAlign: "center", cursor: "pointer" }} onClick={() => navigate(item.route)}>
              <CardContent>
                <Box sx={{ fontSize: 40, color: "primary.main" }}>{item.icon}</Box>
                <Typography variant="h6" sx={{ mt: 1 }}>{item.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
