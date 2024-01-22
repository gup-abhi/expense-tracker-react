import { useContext } from "react";
import { FormLabel, Select, MenuItem } from "@mui/material";
import { PaymentMethodsContext } from "./PaymentMethodsContext";

const SelectPaymentMethods = () => {
  const { paymentArray, paymentSelected, setPaymentSelected } = useContext(
    PaymentMethodsContext
  );

  return (
    <div className="col-6 col-lg-2">
      <FormLabel id="payment-select-label">Payment Methods</FormLabel>
      <Select
        sx={{ width: 1 }}
        id="payment-select"
        label="Payment Methods"
        value={paymentSelected}
        onChange={(e) => setPaymentSelected(e.target.value)}
      >
        {paymentArray.map((payment, index) => {
          return (
            <MenuItem key={index} value={payment.id}>
              {payment.method}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default SelectPaymentMethods;
