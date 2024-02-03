import { useRef } from "react";
import AddOrUpdateExpense from "./AddOrUpdateExpense";
import "./App.css";
import Home from "./Home";
import Dashboard from "./Dashboard";
import RecurringExpense from "./RecurringExpense";
import AddOrUpdateRecurringExepnse from "./AddOrUpdateRecurringExpense";
import LandingPage from "./LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import setUser from "./store/actions/userActions";

function App() {
  const dispatch = useDispatch();
  const ref = useRef(null);

  if (!ref.current) {
    // This code runs before the first render
    console.log("Setting initial ref");
    ref.current = "Initial Ref";
    const user = "abhi";
    dispatch(setUser(user));
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-expense" element={<AddOrUpdateExpense />} />
          <Route path="/expenses" element={<Home />} />
          <Route
            path="/add-recurring-expense"
            element={<AddOrUpdateRecurringExepnse />}
          />
          <Route path="/recurring-expenses" element={<RecurringExpense />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
