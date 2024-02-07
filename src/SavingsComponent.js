import React, { useEffect, useState } from "react";
import { Typography, TextField, Button, LinearProgress } from "@mui/material";
import CardComponent from "./CardComponent";
import axios from "axios";
import API_BASE_URL from "./config/config";
import { notify } from "./Notification";
import { useSelector, useDispatch } from "react-redux";
import setGoal from "./store/actions/goalActions";
import setSavings from "./store/actions/savingsActions";
import LoadingSpinner from "./LoadingSpinner";

const SavingsComponent = ({ month, year }) => {
  const user = useSelector((state) => state.userReducer);
  const goal = useSelector((state) => state.goalReducer);
  const currentSavings = useSelector((state) => state.savingsReducer);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  let inputGoal = 0; // Use a local variable for the input field

  useEffect(() => {
    const fetchSavingsData = async () => {
      try {
        setLoading(true);
        setError(null);

        const savingsResponse = await axios.get(
          `${API_BASE_URL}/user/savings?username=${user}&year=${year}&month=${month}`
        );

        updateSavingsState(savingsResponse.data.savings);
      } catch (error) {
        console.error(error);
        setError(`No savings data found for ${year}-${month}`);
      } finally {
        setLoading(false);
      }
    };

    fetchSavingsData();
  }, [year, month]);

  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        setLoading(true);
        setError(null);

        const goalResponse = await axios.get(
          `${API_BASE_URL}/user/goal?username=${user}`
        );

        console.log(`goalResponse.data.goal - ${goalResponse.data.goal}`);
        updateGoalState(goalResponse.data.goal);
      } catch (error) {
        console.error(error);
        updateGoalState(0);
      } finally {
        setLoading(false);
      }
    };

    fetchGoalData();
  }, [goal]);

  // Function to calculate the progress percentage
  const calculateProgress = () => {
    if (currentSavings < 0) return 0;
    return Math.round((currentSavings / goal) * 100);
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
        `${API_BASE_URL}/user/goal?username=${user}&goal=${inputGoal}`
      );

      console.log(`response - ${JSON.stringify(response.data)}`);
      updateGoalState(inputGoal); // Update the state when the "Update" button is clicked
      notify(response.data.message, "success");
    } catch (error) {
      console.error(error);
      notify(error.response.data.message, "error");
    }
  };

  const renderContent = () => {
    if (loading) return <LoadingSpinner />; // Use the LoadingSpinner component here
    if (error) return <h6 className="my-2">{error}</h6>;
    return (
      <>
        <div className="col-10">
          <LinearProgress
            variant="determinate"
            value={calculateProgress()}
            style={{ marginTop: "20px" }}
          />
        </div>
        <div className="col-2 py-2">
          <Typography variant="em">{calculateProgress()}%</Typography>
        </div>

        <div className="col-12">
          <Typography variant="h6" gutterBottom style={{ marginTop: "10px" }}>
            Current Savings: ${currentSavings}
          </Typography>
        </div>
        <div className="col-12">
          <Typography variant="h6" gutterBottom>
            Goal: $ {goal}
          </Typography>
        </div>
      </>
    );
  };

  const RenderContent = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Typography variant="h5" gutterBottom>
              Savings Tracker
            </Typography>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
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
          </div>
          <div className="col-6">
            <Button
              className="my-4"
              variant="contained"
              color="primary"
              onClick={updateGoal}
            >
              Update
            </Button>
          </div>
        </div>
        <div className="row">{renderContent()}</div>
      </div>
    );
  };

  return <CardComponent Component={RenderContent} />;
};

export default SavingsComponent;
