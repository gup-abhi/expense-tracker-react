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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const AddOrUpdateExpense = () => {
  const location = useLocation();
  dayjs.extend(utc);
  let expenseToUpdate = location.state?.expenseToUpdate;
  const [expenseName, setExpenseName] = useState(
    expenseToUpdate ? expenseToUpdate.expense : ""
  );
  const [amount, setAmount] = useState(
    expenseToUpdate ? expenseToUpdate.amount : 0
  );
  const [categories, setCategorioes] = useState([]);
  const [category, setCategory] = useState(
    expenseToUpdate ? expenseToUpdate.category_id : categories[0]?.id || ""
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
        notify(error.response.data.message);
        console.error(error);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    console.log("expenseToUpdate:", expenseToUpdate);
    if (expenseToUpdate) {
      setExpenseName(expenseToUpdate.expense);
      setAmount(expenseToUpdate.amount);
      setSelectedDate(dayjs(expenseToUpdate.date));
    }
  }, [expenseToUpdate]);

  useEffect(() => {
    console.log("expenseToUpdate:", expenseToUpdate);
    if (categories.length > 0) {
      setCategory(
        expenseToUpdate ? expenseToUpdate.category_id : categories[0].id
      );
    }
  }, [categories, expenseToUpdate]);

  const notify = (message) => {
    toast(message);
  };

  const handleDateChange = (date) => {
    console.log(`date - ${date}`);
    setSelectedDate(date);
  };

  const reset = () => {
    expenseToUpdate = undefined;
    setAmount(0);
    setExpenseName("");
    setCategory(categories[0]?.id || "");
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
    )} \n
      ${expenseToUpdate.expense} :: ${expenseToUpdate.category_id} :: ${
      expenseToUpdate.amount
    } :: ${formatDate(expenseToUpdate.date)}
    `);
    if (
      expenseToUpdate.expense !== expenseName ||
      expenseToUpdate.category_id !== category ||
      expenseToUpdate.amount !== amount ||
      formatDate(expenseToUpdate.date) !== formatDate(selectedDate)
    )
      return true;
    return false;
  };

  const isFilled = () => {
    console.log(
      ` ${expenseName} :: ${category} :: ${amount} :: ${selectedDate}`
    );
    if (expenseName !== "" && amount !== 0 && selectedDate !== null)
      return true;
    return false;
  };

  const addOrUpdateExpense = async () => {
    try {
      let response;

      if (!expenseToUpdate) {
        console.log(`Inside`);
        if (isFilled()) {
          response = await axios.post(`${API_BASE_URL}/expense`, {
            username: "abhi",
            expense: expenseName,
            date: selectedDate.toISOString().split("T")[0],
            amount: amount,
            category_id: category,
          });
        } else {
          notify("Please enter all the details before submitting");
          return;
        }
      } else {
        if (isEdit()) {
          response = await axios.put(
            `${API_BASE_URL}/expense/${expenseToUpdate.id}`,
            {
              username: "abhi",
              expense: expenseName,
              date: selectedDate.toISOString().split("T")[0],
              amount: amount,
              category_id: category,
            }
          );
        } else {
          notify("Please edit before submitting");
          return;
        }
      }

      console.log(`response - ${JSON.stringify(response.data)}`);
      notify(response.data.message);
      reset();
    } catch (error) {
      notify(error);
      console.error(error);
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