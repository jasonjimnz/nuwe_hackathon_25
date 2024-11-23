import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { login } from "../stores/authStore";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { login } from "../services/auth_service";
import { getUserDetail } from "../services/user_service";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      const response = await login(email, password);
      localStorage.setItem("accessToken", response.access_token);
      const userDetail = await getUserDetail();
      const user = { email, type: userDetail.role };
      localStorage.setItem("loggedUser", JSON.stringify(user));
      // login({ email });
      navigate("/");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
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
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          Login
        </Button>
      </form>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/forgot-password")}
          sx={{ ml: 2 }}
        >
          Forgot Password?
        </Button>
      </Box>
    </Box>
  );
}

export default LoginPage;
