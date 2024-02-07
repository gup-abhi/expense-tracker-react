import { MenuItem } from "@mui/material";
import { useContext } from "react";
import { YearMonthContext } from "./YearMonthContext";

export const getLastNYears = (n) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < n; i++) {
    years.push(currentYear - i);
  }
  return years;
};

export const YearMonth = () => {
  const { year, setMonth, setYear } = useContext(YearMonthContext);

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

  return { yearOptions, monthOptions, handleDropdownChange };
};
