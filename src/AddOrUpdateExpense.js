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
  const navigate = useNavigate();
  const expense = location.state?.expenseToUpdate;
  const [form, setForm] = useState({
    description: "",
    category_id: 0,
    payment_method_id: 0,
    transaction_type_id: 0,
    amount: 0,
    date: "",
    username: "abhi",
  });

  const [categories, setCategorioes] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);

  const fetchData = async () => {
    try {
      const categoryResponse = await axios.get(`${API_BASE_URL}/category`);
      const paymentMethodResponse = await axios.get(`${API_BASE_URL}/payment`);
      const transactionTypeResponse = await axios.get(
        `${API_BASE_URL}/transaction`
      );
      setTransactionTypes(transactionTypeResponse.data);
      setPaymentMethods(paymentMethodResponse.data);
      setCategorioes(categoryResponse.data);

      if (expense) {
        setForm((prev) => ({
          ...prev,
          description: expense.description,
          amount: expense.amount,
          date: dayjs.utc(expense.date),
          username: "abhi",
          category_id: expense.category_id,
          payment_method_id: expense.payment_method_id,
          transaction_type_id: expense.transaction_type_id,
        }));
      } else {
        setForm((prevState) => ({
          ...prevState,
          category_id: categoryResponse.data[0].id,
          payment_method_id: paymentMethodResponse.data[0].id,
          transaction_type_id: transactionTypeResponse.data[0].id,
        }));
      }
    } catch (error) {
      notify(error.response.data.message, "error");
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setForm({
      description: "",
      category_id: categories[0].id,
      payment_method_id: paymentMethods[0].id,
      transaction_type_id: transactionTypes[0].id,
      amount: 0,
      date: "",
      username: "abhi",
    });
  };

  const formatDate = (date) => {
    return `${new Date(date).getFullYear()}-${
      new Date(date).getMonth() + 1
    }-${new Date(date).getDate()}`;
  };

  const updateValidateForm = () => {
    if (
      expense.description !== form.description ||
      expense.category_id !== form.category_id ||
      expense.transaction_type_id !== form.transaction_type_id ||
      expense.payment_method_id !== form.payment_method_id ||
      expense.amount !== form.amount ||
      formatDate(expense.date) !== formatDate(form.date)
    )
      return true;
    return false;
  };

  const postValidateForm = () => {
    if (form.description !== "" && form.amount !== 0 && form.date !== "")
      return true;
    return false;
  };

  const createExpense = async () => {
    console.log(`form - ${JSON.stringify(form)}`);

    if (!postValidateForm())
      return notify("Please fill all the fields before submitting", "error");

    try {
      const response = await axios.post(`${API_BASE_URL}/expense`, form);
      notify(response.data.message, "success");
      resetForm();
    } catch (error) {
      console.error(error);
      notify(error.response.data.message, "errorr");
    }
  };

  const updateExpense = async () => {
    console.log(`form - ${JSON.stringify(form)}`);

    if (!updateValidateForm())
      return notify("Please make a change before submitting", "error");

    try {
      const response = await axios.put(
        `${API_BASE_URL}/expense?id=${expense.id}`,
        form
      );
      notify(response.data.message, "success");
      resetForm();
    } catch (error) {
      console.error(error);
      notify(error.response.data.message, "errorr");
    }
  };

  const submitClick = () => {
    if (expense) return updateExpense();

    return createExpense();
  };

  const backToHome = () => {
    navigate(-1);
  };

  const renderCategories = () => {
    if (categories.length === 0) return <MenuItem>No category</MenuItem>;

    return categories.map((category) => {
      return (
        <MenuItem key={category.id} value={category.id}>
          {category.category_name}
        </MenuItem>
      );
    });
  };

  const renderTransactionTypes = () => {
    if (transactionTypes.length === 0)
      return <MenuItem>No Transaction Types</MenuItem>;

    return transactionTypes.map((transaction) => {
      return (
        <MenuItem key={transaction.id} value={transaction.id}>
          {transaction.type}
        </MenuItem>
      );
    });
  };

  const renderPaymentMethods = () => {
    if (paymentMethods.length === 0)
      return <MenuItem>No Payment Methods</MenuItem>;

    return paymentMethods.map((payment) => {
      return (
        <MenuItem key={payment.id} value={payment.id}>
          {payment.method}
        </MenuItem>
      );
    });
  };

  const renderHeading = () => {
    if (expense) return <h1 className="fw-bolder">Update Expense</h1>;
    return <h1 className="fw-bolder">Add Expense</h1>;
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
              <div className="col-8 text-lg-center">{renderHeading()}</div>
            </div>
            <div className="row p-2">
              <div className="col-12 col-lg-6">
                <FormLabel className="label py-2 p-lg-3 fw-bold">
                  Expennse Name
                </FormLabel>
              </div>
              <div className="col-12 col-lg-6">
                <TextField
                  value={form.description}
                  sx={{ width: 3 / 4 }}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
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
                  value={form.category_id}
                  onChange={(e) =>
                    setForm({ ...form, category_id: e.target.value })
                  }
                >
                  {renderCategories()}
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
                  value={form.payment_method_id}
                  onChange={(e) =>
                    setForm({ ...form, payment_method_id: e.target.value })
                  }
                >
                  {renderPaymentMethods()}
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
                  value={form.transaction_type_id}
                  onChange={(e) =>
                    setForm({ ...form, transaction_type_id: e.target.value })
                  }
                >
                  {renderTransactionTypes()}
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
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
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
                    value={dayjs(form.date)}
                    onChange={(date) => setForm({ ...form, date: date })}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-12 col-lg-2 offset-lg-5">
                <Button variant="contained" onClick={submitClick}>
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
