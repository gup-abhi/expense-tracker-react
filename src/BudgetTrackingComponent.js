import React, { useEffect, useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import CardComponent from "./CardComponent";
import axios from "axios";
import API_BASE_URL from "./config/config";
import { notify } from "./Notification";
import { useSelector, useDispatch } from "react-redux";
import setBudget from "./store/actions/budgetActions";
import LoadingSpinner from "./LoadingSpinner";
import { ListItem, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";

const BudgetTrackingComponent = ({ year, month }) => {
  const user = useSelector((state) => state.userReducer);
  const budget = useSelector((state) => state.budgetReducer);
  const [totalExpense, setTotalExpense] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  let inputBudget = 0;

  useEffect(() => {
    const fetchRemainingBudgetData = async () => {
      try {
        setLoading(true);
        setError(null);

        const remainingBudgetResponse = await axios.get(
          `${API_BASE_URL}/user/budget/remaining?username=${user}&year=${year}&month=${month}`
        );

        setRemainingBudget(remainingBudgetResponse.data.remaining_budget);
      } catch (error) {
        console.error(error);
        setError(`No budget found for ${year}-${month}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRemainingBudgetData();
  }, [year, month, budget]);

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        setLoading(true);
        setError(null);

        const budgetResponse = await axios.get(
          `${API_BASE_URL}/user/budget?username=${user}`
        );

        updateBudgetState(budgetResponse.data.budget);
      } catch (error) {
        console.error(error);
        updateBudgetState(0);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgetData();
  }, [budget]);

  useEffect(() => {
    const fetchTotalExpenseData = async () => {
      try {
        setLoading(true);
        setError(null);

        const totalExpenseResponse = await axios.get(
          `${API_BASE_URL}/expense/getTotalExpenseForMonth?username=${user}&year=${year}&month=${month}`
        );

        setTotalExpense(totalExpenseResponse.data.total_expense);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalExpenseData();
  }, [year, month, budget]);

  const updateBudgetState = (budget) => {
    dispatch(setBudget(budget));
  };

  const updateBudget = async () => {
    if (Number(inputBudget) === 0 || Number(inputBudget) < 0) {
      notify("Please provide correct value");
      return;
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/user/budget?username=${user}&budget=${inputBudget}`
      );

      console.log(`response - ${JSON.stringify(response.data)}`);
      notify(response.data.message, "success");
      updateBudgetState(inputBudget); // Update the budget state when the "Update Budget" button is clicked
    } catch (error) {
      console.error(error);
      notify(error.response.data.message, "error");
    }
  };

  const renderContent = () => {
    if (loading) return <LoadingSpinner />; // Use the LoadingSpinner component here
    if (error) return <h6 className="my-2">{error}</h6>;

    return (
      <>
        <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
          Remaining Budget: ${remainingBudget}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Total Expenses: ${totalExpense}
        </Typography>
      </>
    );
  };

  const RenderContent = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Typography variant="h5" gutterBottom>
              Budget Tracker
            </Typography>
          </div>
          <div className="col-6">
            <TextField
              label="Enter Budget"
              type="number"
              defaultValue={budget} // Use value instead of defaultValue
              onChange={(e) => (inputBudget = e.target.value)} // Update the local variable on change
              fullWidth
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Changes the color of the border
                  },
                  "&:hover fieldset": {
                    borderColor: "white", // Changes the color of the border on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // Changes the color of the border when focused
                  },
                  "& input": {
                    // Changes the color of the input text
                    color: "white",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white", // Changes the color of the label
                },
              }}
              variant="outlined" // Add this line to set the variant to outlined
            />
          </div>

          <div className="col-6">
            <Button
              className="my-4"
              variant="contained"
              color="primary"
              onClick={updateBudget}
            >
              Update
            </Button>
          </div>
          <Grid className="my-2" container spacing={2}>
            <Grid item xs={6}>
              <ListItem
                className="list-item"
                component={RouterLink}
                to="/expenses"
              >
                <ListItemText primary="Show Expenses" />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem
                className="list-item"
                component={RouterLink}
                to="/add-expense"
              >
                <ListItemText primary="Add Expense" />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem
                className="list-item"
                component={RouterLink}
                to="/recurring-expenses"
              >
                <ListItemText primary="Show Recurring Expenses" />
              </ListItem>
            </Grid>
            <Grid item xs={6}>
              <ListItem
                className="list-item"
                component={RouterLink}
                to="/add-recurring-expense"
              >
                <ListItemText primary="Add Recurring Expense" />
              </ListItem>
            </Grid>
          </Grid>
          {renderContent()}
        </div>
      </div>
    );
  };

  return <CardComponent Component={RenderContent} />;
};

export default BudgetTrackingComponent;
