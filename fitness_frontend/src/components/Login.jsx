import React, { useState } from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { loginUser } from "../services/api";
import { setCredentials } from "../store/authSlice";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "USER",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);
      dispatch(
        setCredentials({
          token: res.data.token,
          user: res.data.user,
        })
      );
      navigate("/activities");
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 3 }}
    >
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>

      <TextField
        fullWidth
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        select
        label="role"
        name="role"
        value={form.role}
        onChange={handleChange}
        sx={{ mb: 2 }}
      >
        <MenuItem value="USER">USER</MenuItem>
        <MenuItem value="ADMIN">ADMIN</MenuItem>
      </TextField>

      <Button type="submit" variant="contained" fullWidth>
        Login
      </Button>
       <Button
        component={RouterLink}
        to="/register"
        variant="outlined"
        fullWidth
      >
        New Account? Register
      </Button>
    </Box>
  );
};

export default Login;