import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import API_BASE_URL from "./config/config";
import { notify } from "./Notification";
import setUser from "./store/actions/userActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`form - ${JSON.stringify(form)}`);
    login();
  };

  const login = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/user?username=${form.username}&password=${form.password}`
      );

      console.log(response.data.message);
      notify(response.data.message, "success");
      dispatch(setUser(response.data.username));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      notify(error.response.data.message, "error");
    }
  };

  return (
    <Grid container justifyContent="center">
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4">Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            name="username"
            label="Username"
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            name="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <MuiLink component={Link} to="/sign-up">
              Sign Up
            </MuiLink>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
