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
      <div className="row">
        <div className="col-12">
          <h1 className="text-center py-2 fw-bolder">
            Expense Tracker Dashboard
          </h1>
        </div>
      </div>
      <div className="row my-2">
        <div className="col-lg-6"></div>
        <div className="col-lg-3 col-12">
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
        </div>
        <div className="col-lg-3 col-12">
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
        </div>
      </div>
      <div className="row row-flex">
        <div className="col-lg-6 col-12">
          <TotalExpense month={month} year={year} />
        </div>
        <div className="col-lg-6 col-12">
          <ExpenseTrendsComponent month={month} year={year} />
        </div>
        <div className="col-lg-6 col-12">
          <BudgetTrackingComponent month={month} year={year} />
        </div>
        <div className="col-lg-6 col-12">
          <SavingsComponent month={month} year={year} />
        </div>
        <div className="col-lg-6 col-12">
          <TopExpensesComponent month={month} year={year} />
        </div>
        <div className="col-lg-6 col-12">
          <ExpenseBreakdown month={month} year={year} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
