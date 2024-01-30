const savingsReducer = (state = 0, action) => {
  switch (action.type) {
    case "SET_SAVINGS":
      return action.payload;
    default:
      return state;
  }
};

export default savingsReducer;
