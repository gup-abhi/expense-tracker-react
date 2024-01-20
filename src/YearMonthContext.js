import { useState, useEffect, createContext } from "react";
import dayjs from "dayjs";

export const YearMonthContext = createContext();

export const YearMonthProvider = ({ children }) => {
  const [yearMonthSelected, setYearMonthSelected] = useState("");
  const [yearMonthArray, setYearMonthArray] = useState([]);

  useEffect(() => {
    const tempArray = [];
    for (let i = -2; i < 10; i++) {
      let month = dayjs().subtract(i, "month").format("YYYY-MM");
      tempArray.unshift(month);
    }
    setYearMonthArray(tempArray);
    setYearMonthSelected(tempArray[tempArray.length - 3]);
  }, []);

  return (
    <YearMonthContext.Provider
      value={{
        yearMonthSelected,
        setYearMonthSelected,
        yearMonthArray,
        setYearMonthArray,
      }}
    >
      {children}
    </YearMonthContext.Provider>
  );
};
