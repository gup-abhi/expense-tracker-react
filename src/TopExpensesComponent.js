import React, { useEffect, useState } from "react";
import { Typography, List, ListItem } from "@mui/material";
import CardComponent from "./CardComponent";
import axios from "axios";
import API_BASE_URL from "./config/config";

const TopExpensesComponent = ({ year, month }) => {
  // State for expenses list
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/expense/getTopExpenses?username=abhi&year=${year}&month=${month}`
        );

        setExpensesList(response.data);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };

    fetchData();
  }, [year, month]);

  const RenderComponent = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Typography variant="h5" gutterBottom>
              Top Expenses
            </Typography>

            <List>
              {expensesList.map((expense, index) => (
                <ListItem key={index}>
                  <em>
                    {expense.description} - {`$${expense.amount}`}
                  </em>
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
