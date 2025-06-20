import { Avatar, Box, Card, Chip, Typography } from "@mui/material";
import { blue, deepPurple, green } from "@mui/material/colors";
import React from "react";

const roleColors = {
  ADMIN: blue[700],
  MANAGER: green[700],
  EMPLOYEE: deepPurple[600]
};

export default function ProfilePage({ user }) {
  const color = roleColors[user.role] || deepPurple[600];
  const initials = user.fullName ? user.fullName.split(" ").map(n => n[0]).join("").substring(0,2) : user.username[0];

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{
        maxWidth: 350, mx: "auto", p: 3, borderRadius: 3, textAlign: "center", boxShadow: 3,
        bgcolor: "background.paper"
      }}>
        <Avatar sx={{ bgcolor: color, width: 72, height: 72, mx: "auto", fontSize: 32, mb: 1 }}>
          {initials}
        </Avatar>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>{user.fullName}</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>{user.username}</Typography>
        <Chip label={user.role} sx={{ bgcolor: color, color: "#fff", fontWeight: 500, mb: 2 }} clickable={false} />
        <Typography variant="subtitle1">Department:</Typography>
        <Chip label={user.department?.name || "N/A"} color="info" clickable={false}/>
      </Card>
    </Box>
  );
}
