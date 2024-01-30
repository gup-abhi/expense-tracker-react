import React, { useEffect, useState } from "react";
import { Typography, TextField, Button, LinearProgress } from "@mui/material";
import CardComponent from "./CardComponent";
import axios from "axios";
import API_BASE_URL from "./config/config";
import { notify } from "./Notification";
import { useSelector, useDispatch } from "react-redux";
import setGoal from "./store/actions/goalActions";
import setSavings from "./store/actions/savingsActions";

const SavingsComponent = ({ month, year }) => {
  // State for savings goal and current savings
  const goal = useSelector((state) => state.goalReducer);
  const currentSavings = useSelector((state) => state.savingsReducer);
  const dispatch = useDispatch();

  let inputGoal = 0; // Use a local variable for the input field

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savingsResponse = await axios.get(
          `${API_BASE_URL}/user/savings?username=abhi&year=${year}&month=${month}`
        );

        const goalResponse = await axios.get(
          `${API_BASE_URL}/user/goal?username=abhi`
        );

        updateGoalState(goalResponse.data.goal);
        updateSavingsState(savingsResponse.data.savings);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [year, month]);

  // Function to calculate the progress percentage
  const calculateProgress = () => {
    return (currentSavings / goal) * 100;
  };

  const updateGoalState = (goal) => {
    dispatch(setGoal(goal));
  };

  const updateSavingsState = (savings) => {
    dispatch(setSavings(savings));
  };

  const updateGoal = async () => {
    if (Number(inputGoal) === 0 || Number(inputGoal) < 0) {
      notify("Please give a correct value", "info");
      return;
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/user/goal?username=abhi&goal=${inputGoal}`
      );

      console.log(`response - ${JSON.stringify(response.data)}`);
      updateGoalState(inputGoal); // Update the state when the "Update" button is clicked
      notify(response.data.message, "success");
    } catch (error) {
      console.error(error);
      notify(error.response.data.message, "error");
    }
  };

  const RenderContent = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Typography variant="h5" gutterBottom>
              Savings Tracker
            </Typography>

            <TextField
              label="Savings Goal"
              type="number"
              defaultValue={goal}
              onChange={(e) => (inputGoal = e.target.value)} // Update the local variable on change
              fullWidth
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Changes the color of the border
                  },
                  "&:hover fieldset": {
                    borderColor: "white", // Changes the color of the border on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // Changes the color of the border when focused
                  },
                  "& input": {
                    // Changes the color of the input text
                    color: "white",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white", // Changes the color of the label
                },
              }}
            />

            <Button variant="contained" color="primary" onClick={updateGoal}>
              Update
            </Button>

            <LinearProgress
              variant="determinate"
              value={calculateProgress()}
              style={{ marginTop: "20px" }}
            />

            <Typography variant="h6" gutterBottom style={{ marginTop: "10px" }}>
              Current Savings: ${currentSavings}
            </Typography>

            <Typography variant="h6" gutterBottom>
              Goal: ${goal}
            </Typography>
          </div>
        </div>
      </div>
    );
  };

  return <CardComponent Component={RenderContent} />;
};

export default SavingsComponent;
