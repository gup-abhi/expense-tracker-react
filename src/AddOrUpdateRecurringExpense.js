import { useEffect, useState } from "react";
import { FormLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import API_BASE_URL from "./config/config";
import axios from "axios";
import { notify } from "./Notification";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const AddOrUpdateRecurringExepnse = () => {
  dayjs.extend(utc);
  const location = useLocation();
  const navigate = useNavigate();
  const expense = location.state?.expense;
  const [form, setForm] = useState({
    description: "",
    category_id: 1,
    payment_method_id: 1,
    transaction_type_id: 1,
    amount: 0,
    start_date: "",
    frequency: "",
    username: "abhi",
  });

  const [categories, setCategories] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const frequency = [
    {
      id: "W",
      name: "Weekly",
    },
    {
      id: "M",
      name: "Monthly",
    },
    {
      id: "Y",
      name: "Yearly",
    },
  ];

  const initializeForm = async () => {
    try {
      const categoryResponse = await axios.get(`${API_BASE_URL}/category`);
      setCategories(categoryResponse.data);

      const transactionTypeResponse = await axios.get(
        `${API_BASE_URL}/transaction`
      );
      setTransactionTypes(transactionTypeResponse.data);

      const paymentMethodResponse = await axios.get(`${API_BASE_URL}/payment`);
      setPaymentMethods(paymentMethodResponse.data);

      if (expense) {
        setForm((prev) => ({
          ...prev,
          description: expense.description,
          amount: expense.amount,
          start_date: dayjs.utc(expense.start_date),
          username: "abhi",
          category_id: expense.category_id,
          payment_method_id: expense.payment_method_id,
          transaction_type_id: expense.transaction_type_id,
          frequency: expense.frequency,
        }));
      } else {
        setForm((prevState) => ({
          ...prevState,
          category_id: categoryResponse.data[0].id,
          payment_method_id: paymentMethodResponse.data[0].id,
          transaction_type_id: transactionTypeResponse.data[0].id,
          frequency: frequency[0].id,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initializeForm();
  }, []);

  const postValidateForm = () => {
    if (!form.description || form.amount === 0 || !form.start_date)
      return false;
    return true;
  };

  const updateValidateForm = () => {
    if (
      form.description !== expense.description ||
      Number(form.amount) !== Number(expense.amount) ||
      form.start_date !== expense.start_date ||
      form.category_id !== expense.category_id ||
      form.transaction_type_id !== expense.transaction_type_id ||
      form.payment_method_id !== expense.payment_method_id ||
      form.frequency !== expense.frequency
    )
      return true;
    return false;
  };

  const createRecurringExpense = async () => {
    console.log(`form - ${JSON.stringify(form)}`);

    if (!postValidateForm())
      return notify("Please fill all the fields before submitting", "error");

    try {
      const response = await axios.post(`${API_BASE_URL}/recurring`, form);
      notify(response.data.message, "success");
      resetForm();
    } catch (error) {
      console.error(error);
      notify(error.response.data.message, "errorr");
    }
  };

  const updateRecurringExpense = async () => {
    console.log(`form - ${JSON.stringify(form)}`);

    if (!updateValidateForm())
      return notify("Please make a change before submitting", "error");

    try {
      const response = await axios.put(
        `${API_BASE_URL}/recurring/id?id=${expense.id}`,
        form
      );
      notify(response.data.message, "success");
      resetForm();
    } catch (error) {
      console.error(error);
      notify(error.response.data.message, "errorr");
    }
  };

  const resetForm = () => {
    setForm({
      description: "",
      category_id: categories[0].id,
      payment_method_id: paymentMethods[0].id,
      transaction_type_id: transactionTypes[0].id,
      amount: 0,
      start_date: "",
      frequency: frequency[0].id,
      username: "abhi",
    });
  };

  const submitClick = () => {
    if (expense) return updateRecurringExpense();
    return createRecurringExpense();
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

  const renderFrequency = () => {
    return frequency.map((freq) => {
      return (
        <MenuItem key={freq.id} value={freq.id}>
          {freq.name}
        </MenuItem>
      );
    });
  };

  const backToHome = () => {
    navigate("/");
  };

  const renderHeading = () => {
    if (expense) return <h6 className="fw-bolder">Update Recurring Expense</h6>;
    return <h6 className="fw-bolder">Add Recurring Expense</h6>;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-6 offset-lg-3">
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
                sx={{ width: 3 / 4 }}
                value={form.description}
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
                Start Date
              </FormLabel>
            </div>
            <div className="col-12 col-lg-6">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: 3 / 4 }}
                  value={dayjs(form.start_date)}
                  onChange={(date) => setForm({ ...form, start_date: date })}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="row p-2">
            <div className="col-12 col-lg-6">
              <FormLabel className="label py-2 p-lg-3 fw-bold">
                Frequency
              </FormLabel>
            </div>
            <div className="col-12 col-lg-6">
              <Select
                sx={{ width: 3 / 4 }}
                value={form.frequency}
                onChange={(e) =>
                  setForm({ ...form, frequency: e.target.value })
                }
              >
                {renderFrequency()}
              </Select>
            </div>
          </div>
          <div className="row p-2">
            <div className="col-12 col-lg-2 offset-lg-5">
              <Button variant="contained" onClick={submitClick}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrUpdateRecurringExepnse;
