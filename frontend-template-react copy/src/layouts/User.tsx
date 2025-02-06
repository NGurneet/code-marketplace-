import { Box, Theme, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { createStyles } from "@mui/styles";
import theme from "../theme";
import UserNavbar from "../components/UserNavbar";
import Header from "../components/Header";



const User = () => {
  
  
  return (
    <Box >
        {/* <Header title="My App"/> */}
    <UserNavbar/>
      <Outlet />
    </Box>
  );
};

export default User;