import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "./config/config";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledTableCell, StyledTableRow } from "./TableStyles";
import { useNavigate } from "react-router-dom";
import { notify } from "./Notification";
import { useSelector } from "react-redux";

const RecurringExpense = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer);
  const [recurringExpense, setRecurringExpense] = useState([]);
  const frequency = {
    Y: "Yearly",
    M: "Monthly",
    W: "Weekly",
  };

  const addRecurringExpense = () => {
    navigate("/add-recurring-expense");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          `${API_BASE_URL}/recurring?username=${user}`
        );

        console.log(`response - ${JSON.stringify(response.data)}`);
        setRecurringExpense(response.data);
      } catch (error) {
        setRecurringExpense([]);
        console.error(error);
        notify(error.response.data.message, "error");
      }
    };

    fetchData();
  }, []);

  const formatDate = (date) => {
    return `${date.split("T")[0]}`;
  };

  const deleteRecurringExepense = async (id) => {
    console.log(`id - ${id}`);

    try {
      const response = await axios.delete(
        `${API_BASE_URL}/recurring/id?id=${id}`
      );
      console.log(`${response.data.message}`);
      notify(response.data.message, "success");
      setRecurringExpense(
        recurringExpense.filter((expense) => expense.id !== id)
      );
    } catch (error) {
      console.error(error);
      notify(error.response.data.message, "error");
    }
  };

  const editRecurringExepense = async (expense) => {
    console.log(`expense - ${JSON.stringify(expense)}`);
    navigate("/add-recurring-expense", { state: { expense: expense } });
  };

  const goBack = () => {
    navigate(-1);
  };

  const renderContent = () => {
    if (recurringExpense.length === 0)
      return (
        <StyledTableRow>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell></StyledTableCell>
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

    return recurringExpense.map((expense) => (
      <StyledTableRow key={expense.id}>
        <StyledTableCell component="th" scope="row" align="left">
          <Button
            className="mx-2"
            variant="contained"
            onClick={(e) => editRecurringExepense(expense)}
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
          {formatDate(expense.start_date)}
        </StyledTableCell>
        <StyledTableCell align="left">
          {formatDate(expense.next_due_date)}
        </StyledTableCell>
        <StyledTableCell align="left">
          {frequency[expense.frequency]}
        </StyledTableCell>
        <StyledTableCell align="left">
          <Button
            className="mx-2"
            variant="contained"
            onClick={(e) => deleteRecurringExepense(expense.id)}
          >
            <DeleteIcon />
          </Button>
        </StyledTableCell>
      </StyledTableRow>
    ));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <Typography className="text-center my-3 fw-bolder" variant="h4">
            Recurring Expense
          </Typography>
        </div>
      </div>
      <div className="row">
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
                  <StyledTableCell align="left">Start Date</StyledTableCell>
                  <StyledTableCell align="left">Next Due Date</StyledTableCell>
                  <StyledTableCell align="left">Frequency</StyledTableCell>
                  <StyledTableCell align="left">Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderContent()}</TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Button
            className="my-3 float-start"
            variant="contained"
            onClick={goBack}
          >
            Go Back
          </Button>
          <Button
            className="my-3 float-end"
            variant="contained"
            onClick={addRecurringExpense}
          >
            Add Recurring Exepnse
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecurringExpense;
