import { useContext } from "react";
import { FormLabel, Select, MenuItem } from "@mui/material"; // adjust the import as needed
import { YearMonthContext } from "./YearMonthContext";

const SelectDate = () => {
  const { yearMonthSelected, setYearMonthSelected, yearMonthArray } =
    useContext(YearMonthContext);

  return (
    <div className="col-6 col-lg-2">
      <FormLabel id="date-select-label">YYYY-MM</FormLabel>
      <Select
        sx={{ width: 1 }}
        id="date-select"
        label="YYYY-MM"
        value={yearMonthSelected}
        onChange={(e) => setYearMonthSelected(e.target.value)}
      >
        {yearMonthArray.map((yearMonth, index) => {
          return (
            <MenuItem key={index} value={yearMonth}>
              {yearMonth}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default SelectDate;
