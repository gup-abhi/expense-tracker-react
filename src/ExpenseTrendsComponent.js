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
import { ResponsiveContainer } from "recharts";
import LoadingSpinner from "./LoadingSpinner";
import { useSelector } from "react-redux";

const ExpenseTrendsComponent = ({ year, month }) => {
  const user = useSelector((state) => state.userReducer);
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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${API_BASE_URL}/expense/getTotalExpense?username=${user}&year=${year}`
        );

        console.log(`response - ${JSON.stringify(response.data)}`);
        setExpenseData(response.data);
      } catch (error) {
        console.error(error.response.data.message);
        setError(`No expense trends found for ${year}-${month}`);
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
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
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
      </ResponsiveContainer>
    );
  };

  const RenderComponent = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Typography variant="h5" gutterBottom>
              Expense Trends
            </Typography>

            {renderContent()}
          </div>
        </div>
      </div>
    );
  };

  return <CardComponent Component={RenderComponent} />;
};

export default ExpenseTrendsComponent;
