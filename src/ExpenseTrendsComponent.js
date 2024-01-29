import React from "react";
import { Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import CardComponent from "./CardComponent";

const ExpenseTrendsComponent = () => {
  // Sample data for expense trends over time
  const expenseData = [
    { month: "Jan", amount: 500 },
    { month: "Feb", amount: 700 },
    { month: "Mar", amount: 600 },
    { month: "Apr", amount: 800 },
    { month: "May", amount: 900 },
    { month: "Jun", amount: 750 },
    // Add more data as needed
  ];

  const RenderComponent = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Typography variant="h5" gutterBottom>
              Expense Trends
            </Typography>

            <LineChart
              width={500}
              height={300}
              data={expenseData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            </LineChart>
          </div>
        </div>
      </div>
    );
  };

  return <CardComponent Component={RenderComponent} />;
};

export default ExpenseTrendsComponent;
