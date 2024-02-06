import AddOrUpdateExpense from "./AddOrUpdateExpense";
import "./App.css";
import Home from "./Home";
import Dashboard from "./Dashboard";
import RecurringExpense from "./RecurringExpense";
import AddOrUpdateRecurringExepnse from "./AddOrUpdateRecurringExpense";
import LandingPage from "./LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignUp from "./SignUp";
import Login from "./Login";
import PrivateRoutes from "./PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import setUser from "./store/actions/userActions";
import { useEffect, useRef } from "react";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);

  const ref = useRef(null);

  if (!ref.current) {
    const userFromStorage = sessionStorage.getItem("user");
    console.log(`userFromStorage - ${userFromStorage}`);
    if (userFromStorage) {
      dispatch(setUser(userFromStorage));
    }
  }

  useEffect(() => {
    // Save user to localStorage whenever it changes
    sessionStorage.setItem("user", user);
  }, [user]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<PrivateRoutes Component={Dashboard} />}
          />
          <Route
            path="/add-expense"
            element={<PrivateRoutes Component={AddOrUpdateExpense} />}
          />
          <Route
            path="/expenses"
            element={<PrivateRoutes Component={Home} />}
          />
          <Route
            path="/add-recurring-expense"
            element={<PrivateRoutes Component={AddOrUpdateRecurringExepnse} />}
          />
          <Route
            path="/recurring-expenses"
            element={<PrivateRoutes Component={RecurringExpense} />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
