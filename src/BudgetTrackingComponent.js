import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import CardComponent from "./CardComponent";

const BudgetTrackingComponent = () => {
  // State for budget and expenses
  const [budget, setBudget] = useState(0);
  const [expense, setExpense] = useState(0);
  const [expensesList, setExpensesList] = useState([]);
  const [remainingBudget, setRemainingBudget] = useState(budget);

  // Function to handle adding an expense
  const handleAddExpense = () => {
    if (expense > 0) {
      setExpensesList([...expensesList, expense]);
      setRemainingBudget(remainingBudget - expense);
      setExpense(0);
    }
  };

  // Function to calculate the total expenses
  const calculateTotalExpenses = () => {
    return expensesList.reduce((total, exp) => total + exp, 0);
  };

  const RenderContent = () => {
    const inputStyles = {
      color: "white",
      borderColor: "white", // Set the border color to white
    };

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
              value={budget}
              onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
              fullWidth
              margin="normal"
              style={inputStyles} // Apply styles directly to TextField
              InputProps={{
                style: inputStyles,
              }}
              variant="outlined" // Add this line to set the variant to outlined
            />

            <TextField
              label="Enter Expense"
              type="number"
              value={expense}
              onChange={(e) => setExpense(parseFloat(e.target.value) || 0)}
              fullWidth
              margin="normal"
              style={inputStyles} // Apply styles directly to TextField
              InputProps={{
                style: inputStyles,
              }}
              variant="outlined" // Add this line to set the variant to outlined
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddExpense}
            >
              Add Expense
            </Button>

            <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
              Expenses List
            </Typography>
            <ul>
              {expensesList.map((exp, index) => (
                <li key={index}>{exp}</li>
              ))}
            </ul>

            <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
              Remaining Budget: ${remainingBudget.toFixed(2)}
            </Typography>

            <Typography variant="h6" gutterBottom>
              Total Expenses: ${calculateTotalExpenses().toFixed(2)}
            </Typography>
          </div>
        </div>
      </div>
    );
  };

  return <CardComponent Component={RenderContent} />;
};

export default BudgetTrackingComponent;
