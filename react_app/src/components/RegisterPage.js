import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { signUp } from "../services/auth_service";
import { getUserDetail } from "../services/user_service";
function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // const existingUser = localStorage.getItem(email);
    // if (existingUser) {
    //     setError("Email is already registered.");
    //     return;
    // }

    // // Automatically log the user in after successful registration.
    // // - Call the `login` function to set the authenticated user in the store.
    // // Redirect the user to the dashboard.
    // // - After successful registration and login, redirect the user to the home/dashboard page.
    // login(email, password);

    // setSuccess(true);
    // setTimeout(() => {
    //     navigate('/login');
    // }, 2000);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        mb: 8,
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h4" color="primary" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleRegister}>
        <TextField
          label="Email"
          type="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </form>

      <Box sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Account created successfully! Redirecting to login...
        </Alert>
      )}
    </Box>
  );
}

export default RegisterPage;
