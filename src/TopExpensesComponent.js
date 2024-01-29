import React, { useState } from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import CardComponent from "./CardComponent";

const TopExpensesComponent = () => {
  // State for expenses list
  const [expensesList, setExpensesList] = useState([
    { name: "Rent", amount: 1000 },
    { name: "Groceries", amount: 300 },
    { name: "Utilities", amount: 200 },
    // Add more expenses as needed
  ]);

  // Function to sort expenses by amount and return the top 3
  const getTopExpenses = () => {
    return expensesList.sort((a, b) => b.amount - a.amount).slice(0, 3); // Get the top 3 expenses
  };

  const RenderComponent = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Typography variant="h5" gutterBottom>
              Top Expenses
            </Typography>

            <List>
              {getTopExpenses().map((expense, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={expense.name}
                    secondary={`$${expense.amount.toFixed(2)}`}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </div>
    );
  };

  return <CardComponent Component={RenderComponent} />;
};

export default TopExpensesComponent;
