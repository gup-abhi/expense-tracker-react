import React, { useEffect, useState } from "react";
import { Typography, List, ListItem } from "@mui/material";
import CardComponent from "./CardComponent";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import API_BASE_URL from "./config/config";
import { useSelector } from "react-redux";

const TopExpensesComponent = ({ year, month }) => {
  const user = useSelector((state) => state.userReducer);
  const [expensesList, setExpensesList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${API_BASE_URL}/expense/getTopExpenses?username=${user}&year=${year}&month=${month}`
        );

        setExpensesList(response.data);
      } catch (error) {
        console.error(error.response.data.message);
        setError(`No expense done for ${year}-${month}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year, month]);

  const renderContent = () => {
    if (loading) return <LoadingSpinner />; // Use the LoadingSpinner component here
    if (error) return <h6 className="my-2">{error}</h6>;

    return (
      <List>
        {expensesList.map((expense, index) => (
          <ListItem key={index}>
            <em>
              {expense.description} - {`$${expense.amount}`}
            </em>
          </ListItem>
        ))}
      </List>
    );
  };

  const RenderComponent = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Typography variant="h5" gutterBottom>
              Top Expenses
            </Typography>

            {renderContent()}
          </div>
        </div>
      </div>
    );
  };

  return <CardComponent Component={RenderComponent} />;
};

export default TopExpensesComponent;
