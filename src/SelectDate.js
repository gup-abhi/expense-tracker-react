import { useContext } from "react";
import { Select, Typography } from "@mui/material"; // adjust the import as needed
import { YearMonthContext } from "./YearMonthContext";
import { YearMonth } from "./YearMonth";

const SelectDate = () => {
  const { yearOptions, monthOptions, handleDropdownChange } = YearMonth();
  const { year, month } = useContext(YearMonthContext);

  return (
    <>
      <div className="col-6 col-lg-2">
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
      <div className="col-6 col-lg-2">
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
    </>
  );
};

export default SelectDate;
