import {
    Alert,
    Button,
    DialogActions, DialogContent,
    MenuItem,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import API from "./api";

const roles = [
  { value: "ADMIN", label: "Admin" },
  { value: "MANAGER", label: "Manager" },
  { value: "EMPLOYEE", label: "Employee" }
];

export default function UserForm({ onClose }) {
  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);
  const [user, setUser] = useState({
    username: "",
    password: "",
    fullName: "",
    role: "",
    departmentId: "",
    managerId: ""
  });
  const [snack, setSnack] = useState({ open: false, message: "", severity: "warning" });

  useEffect(() => {
    API.get("/admin/departments").then(res => setDepartments(res.data));
    API.get("/admin/users").then(res => setManagers(res.data.filter(u => u.role === "MANAGER")));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Validation function for required fields
  const isValid = () => {
    if (!user.fullName.trim() || !user.username.trim() || !user.password || !user.role) {
      return false;
    }
    // For EMPLOYEE, manager is required
    if (user.role === "EMPLOYEE" && !user.managerId) {
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!isValid()) {
      setSnack({
        open: true,
        message: "Please fill in all required fields.",
        severity: "warning"
      });
      return;
    }
    API.post("/admin/users", user)
      .then(() => {
        onClose(); // parent will show "User added!" only on success
      })
      .catch(() => {
        setSnack({
          open: true,
          message: "Failed to add user. Please try again.",
          severity: "error"
        });
      });
  };

  return (
    <>
      <DialogContent>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>Add User</Typography>
        <TextField
          label="Full Name"
          name="fullName"
          value={user.fullName}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Username"
          name="username"
          value={user.username}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          select
          label="Role"
          name="role"
          value={user.role}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        >
          {roles.map(r => (
            <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Department"
          name="departmentId"
          value={user.departmentId}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="">None</MenuItem>
          {departments.map(dep =>
            <MenuItem key={dep.id} value={dep.id}>{dep.name}</MenuItem>
          )}
        </TextField>
        {user.role === "EMPLOYEE" &&
          <TextField
            select
            label="Manager"
            name="managerId"
            value={user.managerId}
            onChange={handleChange}
            required
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="">None</MenuItem>
            {managers.map(mgr =>
              <MenuItem key={mgr.id} value={mgr.id}>{mgr.fullName}</MenuItem>
            )}
          </TextField>
        }
      </DialogContent>
      <DialogActions>
        <Button color="error" variant="contained" onClick={onClose}>Cancel</Button>
        <Button color="success" variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snack.severity} onClose={() => setSnack({ ...snack, open: false })}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
}
