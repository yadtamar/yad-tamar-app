import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./AddVolunteerPopup.css";

export default function AddVolunteerPopup({ open, setOpen, family_id }) {
  const [volunteer, setVolunteer] = useState({
    community_id: family_id,
    name: "",
    cell_phone: undefined,
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} direction="rtl">
        <DialogTitle>הוספת מתנדב</DialogTitle>
        <DialogContent>
          <DialogContentText>
            על מנת להוסיף מנתדב לקהילה יש להקליד שם ומספר טלפון
          </DialogContentText>
          <TextField
            className="input"
            onChange={(e) => {
              setVolunteer({ ...volunteer, name: e.target.value });
            }}
            value={volunteer.name}
            autoFocus
            margin="dense"
            id="name"
            label="שם"
            fullWidth
            variant="standard"
          />
          <TextField
            className="input"
            onChange={(e) => {
              setVolunteer({ ...volunteer, phone: e.target.value });
            }}
            value={volunteer.phone}
            autoFocus
            margin="dense"
            id="name"
            label="טלפון"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              fetch(
                "http://ec2-18-195-126-1.eu-central-1.compute.amazonaws.com:5000/Create_Volunteer",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(volunteer),
                }
              );
              setVolunteer({ ...volunteer, name: "", phone: "" });
            }}
          >
            הוסף
          </Button>
          <Button onClick={handleClose}>סיים</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
