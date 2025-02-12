import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom"; // Import Outlet for nested routes
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  useMediaQuery,
  Badge,
} from "@mui/material";
import {
  People,
  School,
  MenuBook,
  Notifications,
  UploadFile,
  HowToReg,
} from "@mui/icons-material";
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { useTheme } from "@mui/material/styles";
import Logo from "../../../assets/Admin/Sidebarlogo/Logo.webp"; // Update with correct path

const Sidebar = () => {
  // const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const theme = useTheme();
  const [noticeCount, setNoticeCount] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // const handleProfileMenuOpen = (event) => {
  //   setProfileMenuAnchor(event.currentTarget);
  // };

  // const handleProfileMenuClose = () => {
  //   setProfileMenuAnchor(null);
  // };

  useEffect(() => {
    const storedNotices = JSON.parse(localStorage.getItem("notices")) || [];
    setNoticeCount(storedNotices.length);
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: isMobile ? "70px" : "240px",
          bgcolor: "#b2bec3",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s ease",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
        }}
      >
        {/* Logo Section */}
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Link to="/">
            <Avatar
              src={Logo}
              alt="Logo"
              sx={{ width: 40, height: 40, mx: "auto" }}
            />
          </Link>
          {!isMobile && (
            <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: "bold" }}>
              Nexgen Academy
            </Typography>
          )}
        </Box>

        {/* Menu Section */}
        <List>
          <ListItem
            button
            component={Link}
            to="StudentData" // Nested route for Student Data
            sx={{ "&:hover": { bgcolor: "#636e72" } }}
          >
            <ListItemIcon>
              <People sx={{ color: "inherit" }} />
            </ListItemIcon>
            {!isMobile && <ListItemText primary="Students" />}
          </ListItem>

          <ListItem
            button
            component={Link}
            to="TeacherData" // Nested route for Teacher Data
            sx={{ "&:hover": { bgcolor: "#636e72" } }}
          >
            <ListItemIcon>
              <School sx={{ color: "inherit" }} />
            </ListItemIcon>
            {!isMobile && <ListItemText primary="Teachers" />}
          </ListItem>

          <ListItem
            button
            component={Link}
            to="Library" // Nested route for Library
            sx={{ "&:hover": { bgcolor: "#636e72" } }}
          >
            <ListItemIcon>
              <MenuBook sx={{ color: "inherit" }} />
            </ListItemIcon>
            {!isMobile && <ListItemText primary="Courses" />}
          </ListItem>

          <ListItem
            button
            component={Link}
            to="StudentList" // Nested route for Registration Form
            sx={{ "&:hover": { bgcolor: "#636e72" } }}
          >
            <ListItemIcon>
              <HowToReg sx={{ color: "inherit" }} />
            </ListItemIcon>
            {!isMobile && <ListItemText primary="Enrollment" />}
          </ListItem>
          <ListItem
            button
            component={Link}
            to="CreateNotice" // Nested route for Registration Form
            sx={{ "&:hover": { bgcolor: "#636e72" } }}
          >
            <ListItemIcon>
              <AnnouncementIcon sx={{ color: "inherit" }} />
            </ListItemIcon>
            {!isMobile && <ListItemText primary="Create Notice" />}
          </ListItem>
          <ListItem
            button
            component={Link}
            to="#" // Nested route for Exam Upload (if needed)
            sx={{ "&:hover": { bgcolor: "#636e72" } }}
          >
            <ListItemIcon>
              <UploadFile sx={{ color: "inherit" }} />
            </ListItemIcon>
            {!isMobile && <ListItemText primary="Exam Upload" />}
          </ListItem>
        </List>
      </Box>

      {/* Content Area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f1f3f4",
          marginLeft: isMobile ? "70px" : "240px", // Adjust content layout
          overflowY: "auto",
        }}
      >
        {/* Top Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            bgcolor: "#f1f3f4", // Optional: background color to make it distinct
            position: "sticky", // Makes the box sticky
            top: 0, // Sticks to the top of the container
            zIndex: 10, // Keeps it above other elements
            borderBottom: "1px solid #ddd", // Optional: border for separation
          }}
        >
          <Typography variant="h6">Admin Dashboard</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton component={Link} to="Notice">
              <Badge badgeContent={noticeCount} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            {/* <IconButton component={Link} to="#">
              <Message />
            </IconButton> */}
            {/* <IconButton onClick={handleProfileMenuOpen}>
              <AccountCircle />
            </IconButton> */}
          </Box>
        </Box>

        {/* Profile Menu */}
        {/* <Menu
          anchorEl={profileMenuAnchor}
          open={Boolean(profileMenuAnchor)}
          onClose={handleProfileMenuClose}
        >
          <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
        </Menu> */}

        {/* Main Content Area */}
        <Box sx={{ flex: 1, p: 2 }}>
          {/* The content will change based on nested routes */}
          <Outlet />{" "}
          {/* This renders the content for the active nested route */}
             </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
