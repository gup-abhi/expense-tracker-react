import ExpenseTable from "./ExpenseTable";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DisplayChart from "./DisplayChart";
import { YearMonthProvider } from "./YearMonthContext";
import { CategoryProvider } from "./CategoryContext";
import { PaymentMethodsProvider } from "./PaymentMethodsContext";
import { TransactionTypesProvider } from "./TransactionTypesContext";

const Home = () => {
  const navigate = useNavigate();
  const [isSwitch, setIsSwitch] = useState(false);

  const addExpense = () => {
    navigate("/add-expense");
  };

  const goBack = () => {
    navigate(-1);
  };

  const renderComponent = () => {
    if (isSwitch) return <DisplayChart />;

    return <ExpenseTable />;
  };
  return (
    <div className="container-fluid">
      <div className="row p-2">
        <div className="col-12 col-lg-12 text-lg-center">
          <h1 className="d-inline fw-bolder">
            {isSwitch ? "Expense Chart" : "Expense Table"}
          </h1>
        </div>
      </div>
      <div className="row p-2 justify-content-end">
        {/* <div className="col-3 col-lg-1 mx-3">
          <FormControlLabel
            control={<Switch />}
            label={isSwitch ? "Expense Table" : "Chart"}
            onChange={(e, checked) => setIsSwitch(checked)}
          />
        </div> */}
      </div>
      <div className="row">
        <div className="col">
          <TransactionTypesProvider>
            <PaymentMethodsProvider>
              <CategoryProvider>
                <YearMonthProvider>{renderComponent()}</YearMonthProvider>
              </CategoryProvider>
            </PaymentMethodsProvider>
          </TransactionTypesProvider>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-12 text-lg-center">
          <div className="col-12 col-lg-12 text-center">
            <Button
              className="my-4 float-start"
              variant="contained"
              onClick={goBack}
            >
              Go Back
            </Button>
            <Button
              className="my-4 float-end"
              variant="contained"
              onClick={addExpense}
            >
              Add Expense
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
