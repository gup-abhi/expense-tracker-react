import ExpenseTable from "../ExepenseTable/ExpenseTable";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const addExpense = () => {
    navigate("/add-expense");
  };
  return (
    <div className="container-fluid">
      <div className="row p-2">
        <div className="col-12 col-lg-12 text-lg-center">
          <h1 className="d-inline fw-bolder">Expenses</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ExpenseTable />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-12 text-lg-center">
          <div className="col-12 col-lg-12 text-center">
            <Button
              className="my-4 float-lg-end"
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
