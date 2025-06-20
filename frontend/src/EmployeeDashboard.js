import FactCheckIcon from "@mui/icons-material/FactCheck";
import LogoutIcon from "@mui/icons-material/Logout";
import {
    Alert,
    AppBar,
    Box,
    Button,
    Card,
    Chip,
    Container,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import API from "./api";
import LeaveForm from "./LeaveForm";

const statusColors = {
  APPLIED: "warning",
  APPROVED: "success",
  REJECTED: "error",
};

export default function EmployeeDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });
  const username = localStorage.getItem("username");

  const fetchLeaves = () => {
    API.get("/employee/leaves", { params: { username } }).then(res => setLeaves(res.data));
  };

  useEffect(() => { fetchLeaves(); }, []);

  const onFormSuccess = () => {
    setSnack({ open: true, message: "Leave applied!", severity: "success" });
    fetchLeaves();
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Box sx={{ bgcolor: "#f5f6fa", minHeight: "100vh" }}>
      {/* AppBar */}
      <AppBar position="sticky" elevation={2} color="inherit" sx={{ mb: 4 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FactCheckIcon color="secondary" sx={{ fontSize: 38, mr: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: "secondary.main" }}>
              Employee Dashboard
            </Typography>
          </Box>
          <Button
            color="error"
            variant="outlined"
            endIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ fontWeight: 600, borderRadius: 2, px: 3 }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md">
        {/* Apply for Leave Card */}
        <Card
          sx={{
            p: 4,
            mb: 5,
            boxShadow: 4,
            borderRadius: 4,
            bgcolor: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Typography variant="h6" sx={{ color: "secondary.main", mb: 2, fontWeight: 600 }}>
            Apply for Leave
          </Typography>
          <LeaveForm onSuccess={onFormSuccess} username={username} />
        </Card>

        {/* Leave History Table */}
        <Card sx={{ p: 3, boxShadow: 4, borderRadius: 4, bgcolor: "#fff" }}>
          <Typography variant="h6" sx={{ color: "secondary.main", mb: 2, fontWeight: 600 }}>
            Your Leave History
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#f3f6fb" }}>
                  <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Start</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>End</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Reason</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaves.map((l, i) => (
                  <TableRow
                    key={l.id}
                    sx={{
                      background: i % 2 === 0 ? "#fafbfc" : "#fff",
                      "&:hover": { background: "#e3f2fd" }
                    }}
                  >
                    <TableCell>{l.id}</TableCell>
                    <TableCell>
                      <Chip label={l.leaveType} color="info" variant="outlined" clickable={false}/>
                    </TableCell>
                    <TableCell>{l.startDate}</TableCell>
                    <TableCell>{l.endDate}</TableCell>
                    <TableCell>
                      <Chip
                        label={l.status}
                        color={statusColors[l.status] || "default"}
                        sx={{ minWidth: 80 }} clickable={false}
                      />
                    </TableCell>
                    <TableCell>{l.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Snackbar
          open={snack.open}
          autoHideDuration={2500}
          onClose={() => setSnack({ ...snack, open: false })}
        >
          <Alert severity={snack.severity} onClose={() => setSnack({ ...snack, open: false })}>
            {snack.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
