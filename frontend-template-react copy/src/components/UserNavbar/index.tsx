import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Avatar,
  Button,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import theme from "../../theme";
import { logout } from "../../api/authRuducer";
import { useAppDispatch } from "../../redux/store";

const UserNavbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const menuItems = ["Buy","wallet", "Projects-For-Sale",  "transaction-history"];

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleHamburgerMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    dispatch(logout());
    navigate("/");
  };

  const profileMenu = (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose}>
      <MenuItem onClick={() => navigate("/user-profile")}>Profile</MenuItem>
      <MenuItem onClick={() => navigate("/settings")}>Settings</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const onScroll = () => {
    setSticky(window.scrollY > 50);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: theme.palette.primary.main,
        transition: "background-color 0.3s ease",
        boxShadow: sticky ? "0 4px 8px rgba(0,0,0,0.2)" : "none",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
            CodeMarketplace
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 3 }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "white", "&:hover": { backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "8px" } }}
                onClick={() => navigate(`/${item.toLowerCase()}`)}
              >
                {item.replace("-", " ")}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <IconButton edge="end" onClick={handleProfileMenuOpen}>
              <Avatar alt="User" src="/static/images/avatar/1.jpg" sx={{ "&:hover": { transform: "scale(1.1)", transition: "transform 0.3s ease" } }} />
            </IconButton>
          </Box>

          <IconButton
            edge="start"
            sx={{ display: { sm: "none" }, color: "white", "&:hover": { transform: "rotate(90deg)" } }}
            onClick={handleHamburgerMenu}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {profileMenu}

      {mobileMenuOpen && (
        <Box sx={{ position: "absolute", top: 64, right: 0, backgroundColor: "#333", padding: 2 }}>
          {menuItems.map((item, index) => (
            <MenuItem key={index} onClick={() => navigate(`/${item.toLowerCase()}`)}>
              {item.replace("-", " ")}
            </MenuItem>
          ))}
        </Box>
      )}
    </AppBar>
  );
};

export default UserNavbar;
