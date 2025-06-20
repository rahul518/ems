import {
    Box,
    Button, MenuItem,
    TextField,
    Typography
} from "@mui/material";
import React, { useState } from "react";
import API from "./api";

export default function LeaveForm({ onSuccess }) {
  const [leaveType, setLeaveType] = useState("SICK");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  // Get the username from localStorage
  const username = localStorage.getItem("username");

  const handleSubmit = () => {
    API.post(
      "/employee/leaves",
      { leaveType, startDate, endDate, reason },
      { params: { username } } // <-- Add username as query param
    ).then(onSuccess);
  };

  return (
    <Box>
      <Typography variant="subtitle1" color="secondary" sx={{ mb: 2 }}>Apply for a new leave:</Typography>
      <TextField select label="Leave Type" value={leaveType} onChange={e => setLeaveType(e.target.value)} fullWidth sx={{ mb: 2 }}>
        <MenuItem value="SICK">Sick</MenuItem>
        <MenuItem value="CASUAL">Casual</MenuItem>
        <MenuItem value="OTHER">Other</MenuItem>
      </TextField>
      <TextField label="Start Date" type="date" InputLabelProps={{ shrink: true }} fullWidth sx={{ mb: 2 }} value={startDate} onChange={e => setStartDate(e.target.value)} />
      <TextField label="End Date" type="date" InputLabelProps={{ shrink: true }} fullWidth sx={{ mb: 2 }} value={endDate} onChange={e => setEndDate(e.target.value)} />
      <TextField label="Reason" fullWidth sx={{ mb: 2 }} value={reason} onChange={e => setReason(e.target.value)} />
      <Button variant="contained" color="secondary" sx={{ fontWeight: 600, borderRadius: 2 }} onClick={handleSubmit}>
        Apply
      </Button>
    </Box>
  );
}
