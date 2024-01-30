const budgetReducer = (state = 0, action) => {
  switch (action.type) {
    case "SET_BUDGET":
      return action.payload;
    default:
      return state;
  }
};

export default budgetReducer;
