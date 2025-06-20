import {
    Button,
    DialogActions, DialogContent,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import API from "./api";


export default function DepartmentForm({ onClose }) {
  const [managers, setManagers] = useState([]);
  const [dept, setDept] = useState({ name: "", managerId: "" });

  useEffect(() => {
    API.get("/admin/users").then(res => setManagers(res.data.filter(u => u.role === "MANAGER")));
  }, []);

  const handleChange = (e) => {
    setDept({ ...dept, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    API.post("/admin/departments", dept).then(() => onClose());
  };

  return (
    <>
      <DialogContent>
        <Typography variant="h6" color="success.main" sx={{ mb: 2 }}>Add Department</Typography>
        <TextField label="Department Name" name="name" value={dept.name} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <TextField select label="Manager" name="managerId" value={dept.managerId} onChange={handleChange} fullWidth sx={{ mb: 2 }}>
          <MenuItem value="">None</MenuItem>
          {managers.map(mgr => <MenuItem key={mgr.id} value={mgr.id}>{mgr.fullName}</MenuItem>)}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button color="error" variant="contained" onClick={onClose}>Cancel</Button>
        <Button color="success" variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
    </>
  );
}
