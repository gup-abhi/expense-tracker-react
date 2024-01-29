import React, { useState } from "react";
import { Typography, TextField, Button, LinearProgress } from "@mui/material";
import CardComponent from "./CardComponent";

const SavingsComponent = () => {
  // State for savings goal and current savings
  const [goal, setGoal] = useState(0);
  const [currentSavings, setCurrentSavings] = useState(0);

  // Function to handle updating current savings
  const handleUpdateSavings = () => {
    // Perform validation or additional logic as needed
    // For simplicity, we'll update current savings directly
    setCurrentSavings(Math.min(currentSavings + 10, goal));
  };

  // Function to calculate the progress percentage
  const calculateProgress = () => {
    return (currentSavings / goal) * 100;
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
              value={goal}
              onChange={(e) => setGoal(parseFloat(e.target.value) || 0)}
              fullWidth
              margin="normal"
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateSavings}
            >
              Add to Savings
            </Button>

            <LinearProgress
              variant="determinate"
              value={calculateProgress()}
              style={{ marginTop: "20px" }}
            />

            <Typography variant="h6" gutterBottom style={{ marginTop: "10px" }}>
              Current Savings: ${currentSavings.toFixed(2)}
            </Typography>

            <Typography variant="h6" gutterBottom>
              Goal: ${goal.toFixed(2)}
            </Typography>
          </div>
        </div>
      </div>
    );
  };

  return <CardComponent Component={RenderContent} />;
};

export default SavingsComponent;
