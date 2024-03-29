import { useState, useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import API_BASE_URL from "./config/config";
import axios from "axios";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import SelectDate from "./SelectDate";
import { YearMonthContext } from "./YearMonthContext";
import SelectCategory from "./SelectCategory";
import { CategoryContext } from "./CategoryContext";
import { notify } from "./Notification";
import SelectPaymentMethods from "./SelectPaymentMethods";
import { PaymentMethodsContext } from "./PaymentMethodsContext";
import SelectTransactionTypes from "./SelectTransactionTypes";
import { TransactionTypesContext } from "./TransactionTypesContext";
import { StyledTableCell, StyledTableRow } from "./TableStyles";
import { useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";

export default function ExpenseTable() {
  const user = useSelector((state) => state.userReducer);
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();
  // const { yearMonthSelected } = useContext(YearMonthContext);
  const { year, month } = useContext(YearMonthContext);
  const { category } = useContext(CategoryContext);
  const { paymentSelected } = useContext(PaymentMethodsContext);
  const { transactionTypeSelected } = useContext(TransactionTypesContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log(`year - ${year} :: month - ${month}`);
    const getExpenses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/expense/getAllExpensesForUser?username=${user}&year=${year}&month=${month}&category_id=${category}&payment_method_id=${paymentSelected}&transaction_type_id=${transactionTypeSelected}`
        );
        console.log(response.data);
        setExpenses(response.data);
      } catch (error) {
        setExpenses([]);
        console.log(error.response.data.message);
        notify(error.response.data.message, "error");
      } finally {
        setLoading(false);
      }
    };

    // Check if all parameters are set
    if (
      !year ||
      !month ||
      !category ||
      !paymentSelected ||
      !transactionTypeSelected
    ) {
      return;
    }

    getExpenses();
  }, [year, month, category, paymentSelected, transactionTypeSelected]);

  const formatDate = (date) => {
    return `${date.split("T")[0]}`;
  };

  const editExpense = (expense) => {
    console.log(`expense - ${JSON.stringify(expense)}`);
    navigate("/add-expense", { state: { expenseToUpdate: expense } });
  };

  const deleteExpense = async (expense) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/expense?id=${expense.id}`
      );
      console.log(`deleteExpense - ${JSON.stringify(response.data)}`);
      notify(response.data.message, "success");
      setExpenses(
        expenses.filter((expenseObj) => expenseObj.id !== expense.id)
      );
    } catch (error) {
      console.log(error.response.data.message);
      notify(error.response.data.message, "error");
    }
  };

  const renderContent = () => {
    if (loading)
      return (
        <StyledTableRow>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell>
            <LoadingSpinner />
          </StyledTableCell>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell></StyledTableCell>
        </StyledTableRow>
      );

    if (expenses?.length === 0)
      return (
        <StyledTableRow>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell>No Record Found</StyledTableCell>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell></StyledTableCell>
        </StyledTableRow>
      );

    return expenses.map((expense, index) => (
      <StyledTableRow key={index}>
        <StyledTableCell component="th" scope="row" align="left">
          <Button
            className="mx-2"
            variant="contained"
            onClick={(e) => editExpense(expense)}
          >
            <EditIcon />
          </Button>
        </StyledTableCell>
        <StyledTableCell align="left">{expense.description}</StyledTableCell>
        <StyledTableCell align="left">{expense.category_name}</StyledTableCell>
        <StyledTableCell align="left">
          {expense.transaction_type}
        </StyledTableCell>
        <StyledTableCell align="left">{expense.payment_method}</StyledTableCell>
        <StyledTableCell align="left">
          {expense.amount} {expense.currency_code}
        </StyledTableCell>
        <StyledTableCell align="left">
          {formatDate(expense.date)}
        </StyledTableCell>
        <StyledTableCell align="left">
          <Button
            className="mx-2"
            variant="contained"
            onClick={(e) => deleteExpense(expense)}
          >
            <DeleteIcon />
          </Button>
        </StyledTableCell>
      </StyledTableRow>
    ));
  };

  return (
    <div className="comatiner-fluid">
      <div className="row my-2 justify-content-end">
        <SelectTransactionTypes />
        <SelectPaymentMethods />
        <SelectCategory />
        <SelectDate />
      </div>
      <div className="row my-2">
        <div className="col-12">
          <TableContainer component={Paper}>
            <Table aria-label="Expense table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Edit</StyledTableCell>
                  <StyledTableCell align="left">Exepense</StyledTableCell>
                  <StyledTableCell align="left">Category</StyledTableCell>
                  <StyledTableCell align="left">
                    Transaction Type
                  </StyledTableCell>
                  <StyledTableCell align="left">Payment Method</StyledTableCell>
                  <StyledTableCell align="left">Amount</StyledTableCell>
                  <StyledTableCell align="left">Date</StyledTableCell>
                  <StyledTableCell align="left">Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderContent()}</TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
