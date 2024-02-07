import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Link as MuiLink,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import API_BASE_URL from "./config/config";
import { notify } from "./Notification";
import setUser from "./store/actions/userActions";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const [currencies, setCurrencies] = useState([]);
  const [form, setForm] = useState({
    username: "",
    password: "",
    retype_password: "",
    currency_id: "",
    email: "",
    budget: "",
    saving_goal: "",
  });

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/currency`);
        setCurrencies(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getCurrencies();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`form - ${JSON.stringify(form)}`);
    signup();
  };

  const setCurrencyMenuItems = () => {
    if (currencies.length === 0) return <MenuItem>No currency</MenuItem>;

    return currencies.map((currency) => {
      return (
        <MenuItem value={currency.id} key={currency.id}>
          {currency.currency_code}
        </MenuItem>
      );
    });
  };

  const validateForm = () => {
    if (
      !form.username ||
      !form.email ||
      !form.password ||
      !form.retype_password ||
      !form.currency_id ||
      !form.budget ||
      !form.saving_goal
    ) {
      notify("Please fill all the details", "error");
      return false;
    }

    if (form.password !== form.retype_password) {
      notify("Password don't match", "error");
    }

    return true;
  };

  const signup = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(`${API_BASE_URL}/user`, form);
        console.log(response.data.message);
        dispatch(setUser(response.data.username));
        notify(response.data.message, "success");
        navigate("/dashboard");
      } catch (error) {
        console.error(error.response.data.message);
        notify(error.response.data.message, "error");
      }
    }
  };

  return (
    <Grid container justifyContent="center">
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4">Sign Up</Typography>
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
            name="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
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
          <TextField
            fullWidth
            margin="normal"
            name="retype password"
            label="Retype Password"
            type="password"
            value={form.retype_password}
            onChange={(e) =>
              setForm({ ...form, retype_password: e.target.value })
            }
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="currency-label">Currency</InputLabel>
            <Select
              labelId="currency-label"
              id="currency"
              value={form.currency_id}
              label="Currency"
              onChange={(e) =>
                setForm({ ...form, currency_id: e.target.value })
              }
            >
              {setCurrencyMenuItems()}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            name="budget"
            label="Budget"
            type="number"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            name="savings"
            label="Savings Goal"
            type="number"
            value={form.saving_goal}
            onChange={(e) => setForm({ ...form, saving_goal: e.target.value })}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <MuiLink component={Link} to="/login">
              Login
            </MuiLink>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
};

export default SignUp;
