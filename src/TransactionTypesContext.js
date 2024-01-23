import { useState, useEffect, createContext } from "react";
import axios from "axios";
import API_BASE_URL from "./config/config";
import { notify } from "./Notification";

export const TransactionTypesContext = createContext();

export const TransactionTypesProvider = ({ children }) => {
  const [transactionTypeSelected, setTransactionTypeSelected] = useState("");
  const [transactionTypesArray, setTransactionTypesArray] = useState([]);

  useEffect(() => {
    const getTransactionTypes = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/transaction?includeAll=true`
        );
        setTransactionTypesArray(response.data);
        setTransactionTypeSelected(response.data[response.data.length - 1].id);
      } catch (error) {
        console.log(error.response.data.message);
        notify(error.response.data.message);
      }
    };

    getTransactionTypes();
  }, []);

  return (
    <TransactionTypesContext.Provider
      value={{
        transactionTypeSelected,
        setTransactionTypeSelected,
        transactionTypesArray,
        setTransactionTypesArray,
      }}
    >
      {children}
    </TransactionTypesContext.Provider>
  );
};
