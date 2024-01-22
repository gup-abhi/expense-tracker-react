import { useState, useEffect, createContext } from "react";
import axios from "axios";
import API_BASE_URL from "./config/config";
import { notify } from "./Notification";

export const PaymentMethodsContext = createContext();

export const PaymentMethodsProvider = ({ children }) => {
  const [paymentSelected, setPaymentSelected] = useState("");
  const [paymentArray, setPaymentArray] = useState([]);

  useEffect(() => {
    const getPaymentMethods = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/payment`);
        setPaymentArray(response.data);
        setPaymentSelected(response.data[response.data.length - 1].id);
      } catch (error) {
        console.log(error.response.data.message);
        notify(error.response.data.message);
      }
    };

    getPaymentMethods();
  }, []);

  return (
    <PaymentMethodsContext.Provider
      value={{
        paymentArray,
        setPaymentArray,
        paymentSelected,
        setPaymentSelected,
      }}
    >
      {children}
    </PaymentMethodsContext.Provider>
  );
};
