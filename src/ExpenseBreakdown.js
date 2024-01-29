import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "./config/config";
import Grid from "@mui/material/Grid";
import CardComponent from "./CardComponent";
import LoadingSpinner from "./LoadingSpinner"; // Import the LoadingSpinner component
import { Typography } from "@mui/material";

const ExpenseBreakdown = () => {
  const [expenseBreakdown, setExpenseBreakdown] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getExpenseBreakdown = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/expense/getTotalAmountForEachCategory?username=abhi&year=2024&month=01&category_id=17&payment_method_id=8&transaction_type_id=8`
        );

        setExpenseBreakdown(response.data);
      } catch (error) {
        console.error(error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    getExpenseBreakdown();
  }, []);

  const renderExpense = () => {
    if (loading) return <LoadingSpinner />; // Use the LoadingSpinner component here
    if (error) return <h3>{error}</h3>;
    if (expenseBreakdown.length === 0) return <h3>No Data to show</h3>;

    return (
      <Grid container spacing={2}>
        {expenseBreakdown.map((expense, index) => (
          <Grid item xs={4} key={index}>
            <em>
              {expense.label} - {expense.value}
            </em>
          </Grid>
        ))}
      </Grid>
    );
  };

  const RenderComponent = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <Typography variant="h5" gutterBottom>
            Expense Breakdown
          </Typography>
          {/* <Grid container spacing={2}> */}
          {renderExpense()}
          {/* </Grid> */}
        </div>
      </div>
    </div>
  );

  return <CardComponent Component={RenderComponent} />;
};

export default ExpenseBreakdown;