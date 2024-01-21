import { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ExpenseTable() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();
  const { yearMonthSelected } = useContext(YearMonthContext);
  const { category } = useContext(CategoryContext);

  useEffect(() => {
    const getExpenses = async () => {
      const year = yearMonthSelected.split("-")[0];
      const month = yearMonthSelected.split("-")[1];
      try {
        const response = await axios.get(
          `${API_BASE_URL}/expense/getAllExpensesForUser/abhi/y/${year}/m/${month}/c/${category}`
        );
        console.log(response.data);
        setExpenses(response.data);
      } catch (error) {
        setExpenses([]);
        console.log(error.response.data.message);
        notify(error.response.data.message, "error");
      }
    };

    getExpenses();
  }, [yearMonthSelected, category]);

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
        `${API_BASE_URL}/expense/${expense.id}`
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
    if (expenses?.length === 0)
      return (
        <StyledTableRow>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell>No Record Found</StyledTableCell>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell></StyledTableCell>
        </StyledTableRow>
      );

    return expenses.map((expense) => (
      <StyledTableRow key={expense.id}>
        <StyledTableCell component="th" scope="row" align="left">
          <Button
            className="mx-2"
            variant="contained"
            onClick={(e) => editExpense(expense)}
          >
            <EditIcon />
          </Button>
        </StyledTableCell>
        <StyledTableCell align="left">{expense.expense}</StyledTableCell>
        <StyledTableCell align="left">{expense.category_name}</StyledTableCell>
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
