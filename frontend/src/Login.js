import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    Alert,
    Box,
    Button,
    Card,
    Divider,
    IconButton,
    InputAdornment,
    Paper,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import React, { useState } from "react";

import API from "./api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "error" });

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { username, password });
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("role", res.data.role);
      setSnack({ open: true, message: "Login successful!", severity: "success" });
      setTimeout(() => onLogin(res.data.role), 500);
    } catch {
      setSnack({ open: true, message: "Invalid username or password.", severity: "error" });
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      minWidth: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
      overflow: "hidden"
    }}>
      {/* Subtle Top Branding Bar */}
      <Paper elevation={3}
        sx={{
          position: "absolute", top: 0, left: 0, right: 0,
          bgcolor: "#1976d2",
          color: "#fff",
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          height: 64,
          display: "flex",
          alignItems: "center",
          pl: 4,
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: 1.2,
          boxShadow: 2,
        }}>
        <LockOutlinedIcon sx={{ mr: 1 }} />
        Employee Leave Management
      </Paper>

      {/* Login Card */}
      <Card
        elevation={8}
        sx={{
          width: 375,
          maxWidth: "92vw",
          p: 5,
          pt: 4,
          borderRadius: 5,
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#ffffffee",
          backdropFilter: "blur(2px)",
          animation: "fadeIn 0.7s",
        }}
      >
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 1,
        }}>
          <Box sx={{
            bgcolor: "primary.light",
            p: 2,
            borderRadius: "50%",
            boxShadow: 3,
            mb: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <LockOutlinedIcon sx={{ fontSize: 48, color: "primary.main" }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.2, letterSpacing: 0.5, color: "primary.main" }}>
            Welcome Back
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#4f566b", mb: 2, mt: 0.2, fontWeight: 500 }}>
            Sign in to continue
          </Typography>
        </Box>
        <Divider sx={{ width: "100%", mb: 2 }} />
        <TextField
          label="Username"
          fullWidth
          variant="outlined"
          autoComplete="username"
          margin="normal"
          value={username}
          onChange={e => setUsername(e.target.value)}
          sx={{ mb: 1.5 }}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          variant="outlined"
          autoComplete="current-password"
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(show => !show)}
                  edge="end"
                  size="small"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{
            fontWeight: 700,
            borderRadius: 3,
            mt: 1.5,
            py: 1.1,
            letterSpacing: 0.4,
            fontSize: "1.15rem",
            boxShadow: 2
          }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Snackbar open={snack.open} autoHideDuration={2100} onClose={() => setSnack({ ...snack, open: false })}>
          <Alert onClose={() => setSnack({ ...snack, open: false })} severity={snack.severity} sx={{ width: '100%' }}>
            {snack.message}
          </Alert>
        </Snackbar>
        <Box sx={{ mt: 4, color: "#b0b6c7", fontSize: 13, textAlign: "center", fontWeight: 400 }}>
          &copy; {new Date().getFullYear()} Employee Leave Management &mdash; All rights reserved.
        </Box>
      </Card>
      {/* CSS for fadeIn animation */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: scale(0.92);}
            100% { opacity: 1; transform: scale(1);}
          }
        `}
      </style>
    </Box>
  );
}
