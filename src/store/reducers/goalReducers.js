const goalReducer = (state = 0, action) => {
  switch (action.type) {
    case "SET_GOAL":
      return action.payload;
    default:
      return state;
  }
};

export default goalReducer;
