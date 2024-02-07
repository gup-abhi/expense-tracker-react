import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "./config/config";
import CardComponent from "./CardComponent";
import LoadingSpinner from "./LoadingSpinner";
import { useSelector } from "react-redux";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const ExpenseBreakdown = ({ year, month }) => {
  const user = useSelector((state) => state.userReducer);
  const [expenseBreakdown, setExpenseBreakdown] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getExpenseBreakdown = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${API_BASE_URL}/expense/getTotalAmountForEachCategory?username=${user}&year=${year}&month=${month}&category_id=17&payment_method_id=8&transaction_type_id=8`
        );

        setExpenseBreakdown(response.data);
      } catch (error) {
        console.error(error);
        setError(`No expense breakdown found for ${year}-${month}`);
      } finally {
        setLoading(false);
      }
    };

    getExpenseBreakdown();
  }, [year, month]);

  const renderExpense = () => {
    if (loading) return <LoadingSpinner />;
    if (error) return <h6 className="my-2">{error}</h6>;
    // if (expenseBreakdown.length === 0) return <h3>No Data to show</h3>;

    return (
      <List>
        {expenseBreakdown.map((expense, index) => (
          <ListItem key={index}>
            <ListItemText
              className="list-item px-1"
              primary={`${expense.label} - ${expense.value}`}
            />
          </ListItem>
        ))}
      </List>
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
