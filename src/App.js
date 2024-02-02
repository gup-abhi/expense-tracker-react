import AddOrUpdateExpense from "./AddOrUpdateExpense";
import "./App.css";
import Home from "./Home";
import Dashboard from "./Dashboard";
import RecurringExpense from "./RecurringExpense";
import AddOrUpdateRecurringExepnse from "./AddOrUpdateRecurringExpense";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
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
    </Provider>
  );
}

export default App;
