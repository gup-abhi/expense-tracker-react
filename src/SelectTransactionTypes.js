import { useContext } from "react";
import { FormLabel, Select, MenuItem } from "@mui/material";
import { TransactionTypesContext } from "./TransactionTypesContext";

const SelectTransactionTypes = () => {
  const {
    transactionTypeSelected,
    setTransactionTypeSelected,
    transactionTypesArray,
  } = useContext(TransactionTypesContext);

  return (
    <div className="col-6 col-lg-2">
      <FormLabel id="transaction-types-select-label">
        Transaction Types
      </FormLabel>
      <Select
        sx={{ width: 1 }}
        id="transaction-types-select"
        label="Transaction Types"
        value={transactionTypeSelected}
        onChange={(e) => setTransactionTypeSelected(e.target.value)}
      >
        {transactionTypesArray.map((transactionType, index) => {
          return (
            <MenuItem key={index} value={transactionType.id}>
              {transactionType.type}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default SelectTransactionTypes;
