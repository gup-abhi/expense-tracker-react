import React, { useEffect } from "react";
import { Button, Typography, Box, List, ListItem, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="container-fluid text-center bg-dark text-white"
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h1">Expense Tracker</Typography>
        <Box sx={{ my: 2 }}>
          <Typography variant="h2">Welcome to Expense Tracker</Typography>
          <Typography>
            Keep track of your expenses and manage your budget effectively.
          </Typography>
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography variant="h2">Features</Typography>
          <List>
            <ListItem className="list-item mb-2">Track your expenses</ListItem>
            <ListItem className="list-item my-2">Set a monthly budget</ListItem>
            <ListItem className="list-item my-2">View expense history</ListItem>
            <ListItem className="list-item my-2">
              Visualize monthly expenses in a dashboard
            </ListItem>
            <ListItem className="list-item my-2">
              Add recurring expenses
            </ListItem>
          </List>
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography variant="h2">Get Started</Typography>
          <Link href="login" sx={{ mx: 2 }}>
            <Button variant="contained">Login</Button>
          </Link>
          <Link href="sign-up" sx={{ mx: 2 }}>
            <Button variant="contained" color="secondary">
              SignUp
            </Button>
          </Link>
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography>© 2024 Expense Tracker</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default LandingPage;
