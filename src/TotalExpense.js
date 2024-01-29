import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "./config/config";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import CardComponent from "./CardComponent";
import { Typography } from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import LoadingSpinner from "./LoadingSpinner";

const TotalExpense = () => {
  const [total, setTotal] = useState(0);
  const [budget, setBudget] = useState(0);
  const [budgetLeftPercentage, setBudgetLeftPercentage] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalExpenseResponse = await axios.get(
          `${API_BASE_URL}/expense/getTotalAmountForEachCategory?username=abhi&year=2024&month=01&category_id=17&payment_method_id=8&transaction_type_id=8`
        );
        const budgetResponse = await axios.get(
          `${API_BASE_URL}/user/budget?username=abhi`
        );

        setTotal(totalExpenseResponse.data[0]?.total || 0);
        setBudget(budgetResponse.data.budget || 0);
        setLoading(false);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setBudgetLeftPercentage(Math.round((total / budget) * 100));
  }, [total, budget]);

  const renderContent = () => {
    if (loading) return <LoadingSpinner />; // Use the LoadingSpinner component here
    if (error) return <h3>{error}</h3>;

    return (
      <>
        <Typography variant="h6">Total Expense - {total}</Typography>
        <Divider component="h3" />
        <Typography variant="h6">Total Budget - {budget}</Typography>
        <Divider component="h3" />
        <Box className="py-2" sx={{ width: "100%" }}>
          <Typography variant="h6">Budget Utilised</Typography>
          <div
            className="col-5 offset-3"
            style={{ height: "250px", width: "250px" }}
          >
            <CircularProgressbar
              value={budgetLeftPercentage}
              text={`${budgetLeftPercentage}%`}
              styles={buildStyles({
                textColor: "#fff",
                pathColor: "gold",
                trailColor: "gray",
                strokeWidth: 10, // Adjust this value to control the size
              })}
            />
          </div>
        </Box>
      </>
    );
  };

  const RenderContent = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Typography variant="h5" gutterBottom>
              Total Expense
            </Typography>
            {renderContent()}
          </div>
        </div>
      </div>
    );
  };

  return <CardComponent Component={RenderContent} />;
};

export default TotalExpense;
