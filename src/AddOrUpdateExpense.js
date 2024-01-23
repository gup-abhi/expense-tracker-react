import { FormControl, FormLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "./config/config";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { notify } from "./Notification";

const AddOrUpdateExpense = () => {
  const location = useLocation();
  dayjs.extend(utc);
  let expenseToUpdate = location.state?.expenseToUpdate;
  const [expenseName, setExpenseName] = useState(
    expenseToUpdate ? expenseToUpdate.description : ""
  );
  const [amount, setAmount] = useState(
    expenseToUpdate ? expenseToUpdate.amount : 0
  );
  const [categories, setCategorioes] = useState([]);
  const [category, setCategory] = useState(
    expenseToUpdate ? expenseToUpdate.category_id : categories[0]?.id || ""
  );
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(
    expenseToUpdate
      ? expenseToUpdate.payment_method_id
      : paymentMethods[0]?.id || ""
  );
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [transactionType, setTransactionType] = useState(
    expenseToUpdate
      ? expenseToUpdate.transaction_type_id
      : transactionTypes[0]?.id || ""
  );
  const [selectedDate, setSelectedDate] = useState(
    expenseToUpdate ? dayjs.utc(expenseToUpdate.date) : null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/category`);
        console.log(`categories - ${JSON.stringify(response.data)}`);
        setCategorioes(response.data);
        if (!expenseToUpdate) {
          setCategory(response.data[0].id);
        }
      } catch (error) {
        notify(error.response.data.message, "error");
        console.error(error.response.data.message);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getPaymentMethods = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/payment`);
        console.log(`categories - ${JSON.stringify(response.data)}`);
        setPaymentMethods(response.data);
        if (!expenseToUpdate) {
          setPaymentMethod(response.data[0].id);
        }
      } catch (error) {
        notify(error.response.data.message, "error");
        console.error(error.response.data.message);
      }
    };

    getPaymentMethods();
  }, []);

  useEffect(() => {
    const getTransactionTypes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/transaction`);
        console.log(`categories - ${JSON.stringify(response.data)}`);
        setTransactionTypes(response.data);
        if (!expenseToUpdate) {
          setTransactionType(response.data[0].id);
        }
      } catch (error) {
        notify(error.response.data.message, "error");
        console.error(error.response.data.message);
      }
    };

    getTransactionTypes();
  }, []);

  useEffect(() => {
    console.log("expenseToUpdate:", expenseToUpdate);
    if (expenseToUpdate) {
      setExpenseName(expenseToUpdate.description);
      setAmount(expenseToUpdate.amount);
      setSelectedDate(dayjs(expenseToUpdate.date));
    }
  }, [expenseToUpdate]);

  useEffect(() => {
    // console.log("expenseToUpdate:", expenseToUpdate);
    if (categories.length > 0) {
      setCategory(
        expenseToUpdate ? expenseToUpdate.category_id : categories[0].id
      );
    }
  }, [categories, expenseToUpdate]);

  useEffect(() => {
    // console.log("expenseToUpdate:", expenseToUpdate);
    if (paymentMethods.length > 0) {
      setPaymentMethod(
        expenseToUpdate
          ? expenseToUpdate.payment_method_id
          : paymentMethods[0].id
      );
    }
  }, [paymentMethods, expenseToUpdate]);

  useEffect(() => {
    // console.log("expenseToUpdate:", expenseToUpdate);
    if (transactionTypes.length > 0) {
      setTransactionType(
        expenseToUpdate
          ? expenseToUpdate.transaction_type_id
          : transactionTypes[0].id
      );
    }
  }, [transactionTypes, expenseToUpdate]);

  const handleDateChange = (date) => {
    console.log(`date - ${date}`);
    setSelectedDate(date);
  };

  const reset = () => {
    expenseToUpdate = undefined;
    setAmount(0);
    setExpenseName("");
    setCategory(categories[0]?.id || "");
    setPaymentMethod(paymentMethods[0]?.id || "");
    setTransactionType(transactionTypes[0]?.id || "");
    setSelectedDate(null);
  };

  const formatDate = (date) => {
    return `${new Date(date).getFullYear()}-${
      new Date(date).getMonth() + 1
    }-${new Date(date).getDate()}`;
  };

  const isEdit = () => {
    console.log(`
      ${expenseName} :: ${category} :: ${amount} :: ${formatDate(
      selectedDate
    )} :: ${paymentMethod} :: ${transactionType} \n
      ${expenseToUpdate.description} :: ${expenseToUpdate.category_id} :: ${
      expenseToUpdate.amount
    } :: ${formatDate(expenseToUpdate.date)} :: ${
      expenseToUpdate.payment_method_id
    } :: ${expenseToUpdate.transaction_type_id}
    `);
    if (
      expenseToUpdate.description !== expenseName ||
      expenseToUpdate.category_id !== category ||
      expenseToUpdate.transaction_type_id !== transactionType ||
      expenseToUpdate.payment_method_id !== paymentMethod ||
      expenseToUpdate.amount !== amount ||
      formatDate(expenseToUpdate.date) !== formatDate(selectedDate)
    )
      return true;
    return false;
  };

  const isFilled = () => {
    console.log(
      ` ${expenseName} :: ${category} :: ${amount} :: ${selectedDate} :: ${paymentMethod} :: ${transactionType}`
    );
    if (expenseName !== "" && amount !== 0 && selectedDate !== null)
      return true;
    return false;
  };

  const addOrUpdateExpense = async () => {
    try {
      let response;

      if (!expenseToUpdate) {
        // console.log(`Inside`);
        if (isFilled()) {
          response = await axios.post(`${API_BASE_URL}/expense`, {
            username: "abhi",
            description: expenseName,
            date: selectedDate.toISOString().split("T")[0],
            amount: amount,
            category_id: category,
            transaction_type_id: transactionType,
            payment_method_id: paymentMethod,
          });
        } else {
          notify("Please enter all the details before submitting", "error");
          return;
        }
      } else {
        if (isEdit()) {
          response = await axios.put(
            `${API_BASE_URL}/expense?id=${expenseToUpdate.id}`,
            {
              username: "abhi",
              description: expenseName,
              date: selectedDate.toISOString().split("T")[0],
              amount: amount,
              category_id: category,
              transaction_type_id: transactionType,
              payment_method_id: paymentMethod,
            }
          );
        } else {
          notify("Please edit before submitting", "error");
          return;
        }
      }

      console.log(`response - ${JSON.stringify(response.data)}`);
      notify(response.data.message, "success");
      reset();
    } catch (error) {
      notify(error.response.data.message, "error");
      console.error(error.response.data.message);
    }
  };

  const backToHome = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-6 offset-lg-3">
          <FormControl fullWidth>
            <div className="row p-2">
              <div className="col-4">
                <Button
                  className="m-lg-2"
                  variant="contained"
                  onClick={backToHome}
                >
                  <ArrowBackIcon />
                </Button>
              </div>
              <div className="col-8 text-lg-center">
                {expenseToUpdate && expenseName ? (
                  <h1 className="fw-bolder">Update Expense</h1>
                ) : (
                  <h1 className="fw-bolder">Add Expense</h1>
                )}
              </div>
            </div>
            <div className="row p-2">
              <div className="col-12 col-lg-6">
                <FormLabel className="label py-2 p-lg-3 fw-bold">
                  Expennse Name
                </FormLabel>
              </div>
              <div className="col-12 col-lg-6">
                <TextField
                  value={expenseName}
                  sx={{ width: 3 / 4 }}
                  onChange={(e) => setExpenseName(e.target.value)}
                ></TextField>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-12 col-lg-6">
                <FormLabel className="label py-2 p-lg-3 fw-bold">
                  Category
                </FormLabel>
              </div>
              <div className="col-12 col-lg-6">
                <Select
                  sx={{ width: 3 / 4 }}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.length > 0 ? (
                    categories.map((category) => {
                      return (
                        <MenuItem key={category.id} value={category.id}>
                          {category.category_name}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem>No category</MenuItem>
                  )}
                </Select>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-12 col-lg-6">
                <FormLabel className="label py-2 p-lg-3 fw-bold">
                  Payment Method
                </FormLabel>
              </div>
              <div className="col-12 col-lg-6">
                <Select
                  sx={{ width: 3 / 4 }}
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  {paymentMethods.length > 0 ? (
                    paymentMethods.map((paymentMethod) => {
                      return (
                        <MenuItem
                          key={paymentMethod.id}
                          value={paymentMethod.id}
                        >
                          {paymentMethod.method}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem>No payment method</MenuItem>
                  )}
                </Select>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-12 col-lg-6">
                <FormLabel className="label py-2 p-lg-3 fw-bold">
                  Transaction Types
                </FormLabel>
              </div>
              <div className="col-12 col-lg-6">
                <Select
                  sx={{ width: 3 / 4 }}
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                >
                  {transactionTypes.length > 0 ? (
                    transactionTypes.map((transaction) => {
                      return (
                        <MenuItem key={transaction.id} value={transaction.id}>
                          {transaction.type}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem>No Transaction type</MenuItem>
                  )}
                </Select>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-12 col-lg-6">
                <FormLabel className="label py-2 p-lg-3 fw-bold">
                  Amount
                </FormLabel>
              </div>
              <div className="col-12 col-lg-6">
                <TextField
                  sx={{ width: 3 / 4 }}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                ></TextField>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-12 col-lg-6">
                <FormLabel className="label py-2 p-lg-3 fw-bold">
                  Date
                </FormLabel>
              </div>
              <div className="col-12 col-lg-6">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: 3 / 4 }}
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-12 col-lg-2 offset-lg-5">
                <Button variant="contained" onClick={addOrUpdateExpense}>
                  Submit
                </Button>
              </div>
            </div>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default AddOrUpdateExpense;
