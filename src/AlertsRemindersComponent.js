import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CardComponent from "./CardComponent";

const AlertsRemindersComponent = () => {
  // State for reminders
  const [reminder, setReminder] = useState("");
  const [reminderList, setReminderList] = useState([]);

  // Function to add a reminder
  const handleAddReminder = () => {
    if (reminder.trim() !== "") {
      setReminderList([...reminderList, reminder]);
      setReminder("");
    }
  };

  // Function to remove a reminder
  const handleRemoveReminder = (index) => {
    const updatedReminders = [...reminderList];
    updatedReminders.splice(index, 1);
    setReminderList(updatedReminders);
  };

  const RenderComponent = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Typography variant="h5" gutterBottom>
              Alerts/Reminders
            </Typography>

            <TextField
              label="Set Reminder"
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
              fullWidth
              margin="normal"
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddReminder}
            >
              Add Reminder
            </Button>

            <List style={{ marginTop: "20px" }}>
              {reminderList.map((rem, index) => (
                <ListItem key={index}>
                  <ListItemText primary={rem} />
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemoveReminder(index)}
                  >
                    Remove
                  </Button>
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </div>
    );
  };

  return <CardComponent Component={RenderComponent} />;
};

export default AlertsRemindersComponent;
