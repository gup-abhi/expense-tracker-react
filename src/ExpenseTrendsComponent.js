import React, { useEffect, useState } from "react";
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
import axios from "axios";
import API_BASE_URL from "./config/config";

const ExpenseTrendsComponent = ({ year, month }) => {
  // Sample data for expense trends over time
  const [expenseData, setExpenseData] = useState([]);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/expense/getTotalExpense?username=abhi&year=${year}`
        );

        console.log(`response - ${JSON.stringify(response.data)}`);
        setExpenseData(response.data);
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
              Expense Trends
            </Typography>

            <LineChart
              width={500}
              height={300}
              data={expenseData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickFormatter={(monthNumber) => monthNames[monthNumber - 1]}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total_expense"
                stroke="#8884d8"
                name="Expense"
              />
            </LineChart>
          </div>
        </div>
      </div>
    );
  };

  return <CardComponent Component={RenderComponent} />;
};

export default ExpenseTrendsComponent;
