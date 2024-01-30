import React, { useState } from "react";
import TotalExpense from "./TotalExpense";
import ExpenseBreakdown from "./ExpenseBreakdown";
import BudgetTrackingComponent from "./BudgetTrackingComponent";
import SavingsComponent from "./SavingsComponent";
import TopExpensesComponent from "./TopExpensesComponent";
import ExpenseTrendsComponent from "./ExpenseTrendsComponent";
import AlertsRemindersComponent from "./AlertsRemindersComponent";
import { Typography, Select, MenuItem, Grid } from "@mui/material";

const Dashboard = () => {
  // Function to get the last N years
  const getLastNYears = (n) => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < n; i++) {
      years.push(currentYear - i);
    }
    return years;
  };

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(getLastNYears(5)[0].toString());

  // Function to handle dropdown changes
  const handleDropdownChange = (event) => {
    const { name, value } = event.target;

    if (name === "month") {
      setMonth(value);
    } else if (name === "year") {
      setYear(value);
    }
  };

  const yearOptions = getLastNYears(5).map((year, index) => (
    <MenuItem key={`year-${index}`} value={year.toString()}>
      {year}
    </MenuItem>
  ));

  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1).map(
    (month, index) => (
      <MenuItem key={`month-${index}`} value={month.toString()}>
        {new Date(year, month - 1, 1).toLocaleString("default", {
          month: "long",
        })}
      </MenuItem>
    )
  );

  return (
    <div className="dashboard container-fluid">
      {/* Render Components with selected dropdown values */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1 className="text-center py-2 fw-bolder">
            Expense Tracker Dashboard
          </h1>
        </Grid>

        {/* Render Dropdowns */}
        <Grid container spacing={2} m={3}>
          <Grid item lg={6} />
          <Grid item xs={12} lg={3}>
            <Typography variant="subtitle1">Month:</Typography>
            <Select
              label="Month"
              id="month"
              name="month"
              value={month}
              onChange={handleDropdownChange}
              fullWidth
            >
              {monthOptions}
            </Select>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Typography variant="subtitle1">Year:</Typography>
            <Select
              label="Year"
              id="year"
              name="year"
              value={year.toString()}
              onChange={handleDropdownChange}
              fullWidth
            >
              {yearOptions}
            </Select>
          </Grid>
        </Grid>

        <Grid item xs={12} lg={6}>
          <TotalExpense month={month} year={year} />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ExpenseBreakdown month={month} year={year} />
        </Grid>

        <Grid item xs={12} lg={6}>
          <BudgetTrackingComponent month={month} year={year} />
        </Grid>

        <Grid item xs={12} lg={6}>
          <SavingsComponent month={month} year={year} />
        </Grid>

        <Grid item xs={12} lg={6}>
          <TopExpensesComponent month={month} year={year} />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ExpenseTrendsComponent month={month} year={year} />
        </Grid>

        {/* <Grid item xs={12}>
          <AlertsRemindersComponent month={month} year={year} />
        </Grid> */}
      </Grid>
    </div>
  );
};

export default Dashboard;
