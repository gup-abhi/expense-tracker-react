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
import { useSelector } from "react-redux";

const TotalExpense = ({ month, year }) => {
  const [total, setTotal] = useState(0);
  const budget = useSelector((state) => state.budgetReducer);
  const savings = useSelector((state) => state.savingsReducer);
  const [budgetLeftPercentage, setBudgetLeftPercentage] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const totalExpenseResponse = await axios.get(
          `${API_BASE_URL}/expense/getTotalExpenseForMonth?username=abhi&year=${year}&month=${month}`
        );

        setTotal(totalExpenseResponse.data.total_expense || 0);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
        setError(`No total expense found for ${year}-${month}`);
        setTotal(0);
        setBudgetLeftPercentage(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month, year]);

  useEffect(() => {
    setBudgetLeftPercentage(Math.round((total / budget) * 100));
  }, [total, budget]);

  const renderContent = () => {
    if (loading) return <LoadingSpinner />; // Use the LoadingSpinner component here
    if (error) return <h6 className="my-2">{error}</h6>;

    return (
      <>
        <div className="col-8 col-lg-3">
          <Typography variant="h6">Total Expense :</Typography>
        </div>
        <div className="col-4 col-lg-9">
          <Typography variant="h6"> ${total}</Typography>
        </div>
        <div className="col-8 col-lg-3">
          <Typography variant="h6">Total Budget :</Typography>
        </div>
        <div className="col-4 col-lg-9">
          <Typography variant="h6"> ${budget}</Typography>
        </div>
        <div className="col-8 col-lg-3">
          <Typography variant="h6">Total Savings :</Typography>
        </div>
        <div className="col-4 col-lg-9">
          <Typography variant="h6"> ${savings}</Typography>
        </div>

        <Box className="py-2">
          <Typography variant="h6">Budget Utilised</Typography>
          <div
            className="col-4 col-lg-5 offset-3 offset-lg-4"
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              height: "150px",
              width: "150px",
            }}
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
          </div>
        </div>
        <div className="row">{renderContent()}</div>
      </div>
    );
  };

  return <CardComponent Component={RenderContent} />;
};

export default TotalExpense;
