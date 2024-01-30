import { combineReducers } from "redux";
import budgetReducer from "./budgetReducers";
import goalReducer from "./goalReducers";
import savingsReducer from "./savingsReducers";

const rootReducer = combineReducers({
  budgetReducer,
  goalReducer,
  savingsReducer,
});

export default rootReducer;
