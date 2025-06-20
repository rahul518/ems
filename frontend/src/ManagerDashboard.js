import GroupsIcon from "@mui/icons-material/Groups";
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
    Tooltip,
    Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import API from "./api";

const statusColors = {
  APPLIED: "warning",
  APPROVED: "success",
  REJECTED: "error",
};

export default function ManagerDashboard() {
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  // Helper to get the manager's username from localStorage
  const username = localStorage.getItem("username");

  const fetchData = () => {
    API.get("/manager/employees", { params: { username } }).then(res => setEmployees(res.data));
    API.get("/manager/leaves", { params: { username } }).then(res => setLeaves(res.data));
  };

  useEffect(() => { fetchData(); }, []);

  const handleApprove = (id) => {
    API.post(`/manager/leaves/${id}/approve`, null, { params: { username } }).then(() => {
      setSnack({ open: true, message: "Leave approved", severity: "success" });
      fetchData();
    });
  };

  const handleReject = (id) => {
    API.post(`/manager/leaves/${id}/reject`, null, { params: { username } }).then(() => {
      setSnack({ open: true, message: "Leave rejected", severity: "error" });
      fetchData();
    });
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
            <GroupsIcon color="success" sx={{ fontSize: 38, mr: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: "success.main" }}>
              Manager Dashboard
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
      <Container maxWidth="lg">
        {/* Employees List */}
        <Card sx={{ p: 4, mb: 5, boxShadow: 4, borderRadius: 4, bgcolor: "#fff" }}>
          <Typography variant="h6" sx={{ color: "success.main", mb: 2, fontWeight: 600 }}>
            Your Employees
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#f3f6fb" }}>
                  <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map(e => (
                  <TableRow
                    key={e.id}
                    sx={{
                      background: e.id % 2 === 0 ? "#fafbfc" : "#fff",
                      "&:hover": { background: "#e3f2fd" }
                    }}
                  >
                    <TableCell>{e.id}</TableCell>
                    <TableCell>{e.fullName}</TableCell>
                    <TableCell>
                      {e.department ? <Chip label={e.department.name} color="info" clickable={false}/> : ""}
                    </TableCell>
                    <TableCell>
                      <Chip label={e.role} color="secondary" clickable={false}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* Leave Requests */}
        <Card sx={{ p: 4, boxShadow: 4, borderRadius: 4, bgcolor: "#fff" }}>
          <Typography variant="h6" sx={{ color: "success.main", mb: 2, fontWeight: 600 }}>
            Leave Requests
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#f3f6fb" }}>
                  <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Employee</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Start</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>End</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Reason</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
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
                    <TableCell>{l.employee?.fullName}</TableCell>
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
                    <TableCell>
                      {l.status === "APPLIED" && (
                        <>
                          <Tooltip title="Approve">
                            <Button
                              size="small"
                              color="success"
                              variant="contained"
                              sx={{ mr: 1, fontWeight: 600 }}
                              onClick={() => handleApprove(l.id)}
                            >
                              Approve
                            </Button>
                          </Tooltip>
                          <Tooltip title="Reject">
                            <Button
                              size="small"
                              color="error"
                              variant="contained"
                              sx={{ fontWeight: 600 }}
                              onClick={() => handleReject(l.id)}
                            >
                              Reject
                            </Button>
                          </Tooltip>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Snackbar open={snack.open} autoHideDuration={2500} onClose={() => setSnack({ ...snack, open: false })}>
          <Alert severity={snack.severity} onClose={() => setSnack({ ...snack, open: false })}>
            {snack.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
