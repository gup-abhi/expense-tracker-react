import { combineReducers } from "redux";
import budgetReducer from "./budgetReducers";
import goalReducer from "./goalReducers";
import savingsReducer from "./savingsReducers";
import userReducer from "./userReducers";

const rootReducer = combineReducers({
  budgetReducer,
  goalReducer,
  savingsReducer,
  userReducer,
});

export default rootReducer;
