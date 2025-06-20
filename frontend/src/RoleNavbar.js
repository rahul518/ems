import BusinessIcon from "@mui/icons-material/Business";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import GroupsIcon from "@mui/icons-material/Groups";
import { AppBar, Avatar, Box, Button, Toolbar, Typography } from "@mui/material";
import { blue, deepPurple, green } from "@mui/material/colors";
import React from "react";

const roleStyles = {
  ADMIN: { color: blue[700], icon: <BusinessIcon /> },
  MANAGER: { color: green[700], icon: <GroupsIcon /> },
  EMPLOYEE: { color: deepPurple[600], icon: <FactCheckIcon /> }
};

export default function RoleNavbar({ user, onLogout }) {
  const role = user?.role || "EMPLOYEE";
  const color = roleStyles[role]?.color;
  const icon = roleStyles[role]?.icon;
  const initials = user?.fullName ? user.fullName[0] : role[0];

  return (
    <AppBar position="sticky" sx={{ bgcolor: color }}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          {icon}
          <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
            {role.charAt(0) + role.slice(1).toLowerCase()} Dashboard
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ bgcolor: color, mr: 1 }}>{initials}</Avatar>
          <Typography variant="body1" sx={{ mr: 2, fontWeight: 500 }}>{user?.fullName}</Typography>
          <Button color="inherit" variant="outlined" sx={{ borderColor: "#fff", color: "#fff" }} onClick={onLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
