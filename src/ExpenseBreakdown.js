import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "./config/config";
import Grid from "@mui/material/Grid";
import CardComponent from "./CardComponent";
import LoadingSpinner from "./LoadingSpinner";
import { Typography } from "@mui/material";

const ExpenseBreakdown = ({ year, month }) => {
  const [expenseBreakdown, setExpenseBreakdown] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getExpenseBreakdown = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${API_BASE_URL}/expense/getTotalAmountForEachCategory?username=abhi&year=${year}&month=${month}&category_id=17&payment_method_id=8&transaction_type_id=8`
        );

        setExpenseBreakdown(response.data);
      } catch (error) {
        console.error(error);
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    getExpenseBreakdown();
  }, [year, month]);

  const renderExpense = () => {
    if (loading) return <LoadingSpinner />;
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
          {renderExpense()}
        </div>
      </div>
    </div>
  );

  return <CardComponent Component={RenderComponent} />;
};

export default ExpenseBreakdown;
