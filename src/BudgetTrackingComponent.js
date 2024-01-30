import React, { useEffect, useState } from "react";
import { Typography, TextField, Button, Link } from "@mui/material";
import CardComponent from "./CardComponent";
import axios from "axios";
import API_BASE_URL from "./config/config";
import { notify } from "./Notification";
import { useSelector, useDispatch } from "react-redux";
import setBudget from "./store/actions/budgetActions";
import LoadingSpinner from "./LoadingSpinner";

const BudgetTrackingComponent = ({ year, month }) => {
  const budget = useSelector((state) => state.budgetReducer);
  const [totalExpense, setTotalExpense] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  let inputBudget = 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const remainingBudgetResponse = await axios.get(
          `${API_BASE_URL}/user/budget/remaining?username=abhi&year=${year}&month=${month}`
        );
        const budgetResponse = await axios.get(
          `${API_BASE_URL}/user/budget?username=abhi`
        );
        const totalExpenseResponse = await axios.get(
          `${API_BASE_URL}/expense/getTotalExpenseForMonth?username=abhi&year=${year}&month=${month}`
        );

        setRemainingBudget(remainingBudgetResponse.data.remaining_budget);
        setTotalExpense(totalExpenseResponse.data.total_expense);
        updateBudgetState(budgetResponse.data.budget);
      } catch (error) {
        console.error(error);
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year, month, budget]); // Remove budget from the dependencies

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
        `${API_BASE_URL}/user/budget?username=abhi&budget=${inputBudget}`
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
    if (error) return <h3>{error}</h3>;

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

            <Button
              className="m-2"
              variant="contained"
              color="primary"
              onClick={updateBudget}
            >
              Update Budget
            </Button>

            <Link href="/add-expense">
              <Button className="m-2" variant="contained" color="primary">
                Add Expense
              </Button>
            </Link>

            <Link href="/expenses">
              <Button className="m-2" variant="contained" color="primary">
                Show All Expenses
              </Button>
            </Link>

            {renderContent()}
          </div>
        </div>
      </div>
    );
  };

  return <CardComponent Component={RenderContent} />;
};

export default BudgetTrackingComponent;
