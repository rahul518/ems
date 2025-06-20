import BusinessIcon from '@mui/icons-material/Business';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import {
    Alert,
    AppBar,
    Box,
    Button,
    Card,
    Chip,
    Container,
    Dialog,
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
import DepartmentForm from "./DepartmentForm";
import UserForm from "./UserForm";

const roleColors = {
  ADMIN: "primary",
  MANAGER: "success",
  EMPLOYEE: "secondary"
};

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [openUserForm, setOpenUserForm] = useState(false);
  const [openDeptForm, setOpenDeptForm] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  const fetchData = () => {
    API.get("/admin/users").then(res => setUsers(res.data));
    API.get("/admin/departments").then(res => setDepartments(res.data));
  };

  useEffect(() => { fetchData(); }, []);

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
            <BusinessIcon color="primary" sx={{ fontSize: 36, mr: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: "primary.main" }}>
              Admin Dashboard
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

      <Container maxWidth="lg">
        {/* Actions Card */}
        <Card sx={{
          p: 3, mb: 4, borderRadius: 4, boxShadow: 4, bgcolor: "#fff",
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <Box>
            <Tooltip title="Add User">
              <Button
                variant="contained"
                color="secondary"
                sx={{ mr: 2, fontWeight: 600, px: 2 }}
                onClick={() => setOpenUserForm(true)}
                startIcon={<PersonAddAltIcon />}
              >
                Add User
              </Button>
            </Tooltip>
            <Tooltip title="Add Department">
              <Button
                variant="contained"
                color="success"
                sx={{ fontWeight: 600, px: 2 }}
                onClick={() => setOpenDeptForm(true)}
                startIcon={<BusinessIcon />}
              >
                Add Department
              </Button>
            </Tooltip>
          </Box>
        </Card>

        {/* Add User Dialog */}
        <Dialog open={openUserForm} onClose={() => setOpenUserForm(false)} maxWidth="sm" fullWidth>
          <UserForm onClose={() => { setOpenUserForm(false); fetchData(); setSnack({ open: true, message: "User added!", severity: "success" }); }} />
        </Dialog>
        {/* Add Department Dialog */}
        <Dialog open={openDeptForm} onClose={() => setOpenDeptForm(false)} maxWidth="sm" fullWidth>
          <DepartmentForm onClose={() => { setOpenDeptForm(false); fetchData(); setSnack({ open: true, message: "Department added!", severity: "success" }); }} />
        </Dialog>

        {/* Users Table */}
        <Typography variant="h6" sx={{ mt: 2, mb: 1, color: "primary.main", fontWeight: 600 }}>
          All Users
        </Typography>
        <Card sx={{ p: 2, mb: 4, boxShadow: 3, borderRadius: 4, bgcolor: "#fff" }}>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#f3f6fb" }}>
                  <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Username</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Manager</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((u, i) => (
                  <TableRow
                    key={u.id}
                    sx={{
                      background: i % 2 === 0 ? "#fafbfc" : "#fff",
                      "&:hover": { background: "#e3f2fd" }
                    }}
                  >
                    <TableCell>{u.id}</TableCell>
                    <TableCell>{u.fullName}</TableCell>
                    <TableCell>{u.username}</TableCell>
                    <TableCell>
                      <Chip label={u.role} color={roleColors[u.role] || "default"} clickable ={false} tabIndex={-1}/>
                    </TableCell>
                    <TableCell>
                      {u.department ? <Chip label={u.department.name} color="info" clickable={false} tabIndex={-1}/> : ""}
                    </TableCell>
                    <TableCell>
                      {u.manager ? <Chip label={u.manager.fullName} color="success" clickable={false}/> : ""}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* Departments Table */}
        <Typography variant="h6" sx={{ mt: 3, mb: 1, color: "primary.main", fontWeight: 600 }}>
          Departments
        </Typography>
        <Card sx={{ p: 2, boxShadow: 3, borderRadius: 4, bgcolor: "#fff" }}>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#f3f6fb" }}>
                  <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Manager</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departments.map((d, i) => (
                  <TableRow
                    key={d.id}
                    sx={{
                      background: i % 2 === 0 ? "#fafbfc" : "#fff",
                      "&:hover": { background: "#e3f2fd" }
                    }}
                  >
                    <TableCell>{d.id}</TableCell>
                    <TableCell>
                      <Chip label={d.name} color="info" clickable={false}/>
                    </TableCell>
                    <TableCell>
                      {d.manager ? <Chip label={d.manager.fullName} color="success" clickable={false}/> : ""}
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
