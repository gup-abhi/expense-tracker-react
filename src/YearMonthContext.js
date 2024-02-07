import { useState, createContext } from "react";
import { getLastNYears } from "./YearMonth";

export const YearMonthContext = createContext();

export const YearMonthProvider = ({ children }) => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(getLastNYears(5)[0].toString());

  return (
    <YearMonthContext.Provider
      value={{
        year,
        setYear,
        month,
        setMonth,
      }}
    >
      {children}
    </YearMonthContext.Provider>
  );
};
