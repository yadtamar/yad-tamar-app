import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormLabel from "../FormLabel/FormLabel";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addVolunteerSchema } from "../CreateFamilyForm/schema";
import "./AddVolunteerPopup.css";

export default function AddVolunteerPopup({ open, setOpen, family_id }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addVolunteerSchema), mode: "onBlur" });
  const [volunteer, setVolunteer] = useState({
    family_id: family_id,
    name: "",
    cell_phone: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} direction="rtl">
        <DialogTitle>הוספת מתנדב</DialogTitle>
        <DialogContent>
          <CloseIcon
            style={{
              position: "absolute",
              left: "10px",
              top: "10px",
              cursor: "pointer",
            }}
            onClick={handleClose}
          />
          <DialogContentText style={{ marginBottom: "20px" }}>
            על מנת להוסיף מנתדב לקהילה יש להקליד שם ומספר טלפון
          </DialogContentText>
          <FormLabel text="שם המתנדב" />
          <TextField
            className="input"
            {...register("name")}
            error={!!errors.name}
            helperText={errors?.name?.message}
            onChange={(e) => {
              setVolunteer({ ...volunteer, name: e.target.value });
            }}
            value={volunteer.name}
            margin="dense"
            fullWidth
          />
          <FormLabel text="טלפון נייד" />
          <TextField
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors?.phone?.message}
            className="input"
            onChange={(e) => {
              setVolunteer({ ...volunteer, phone: e.target.value });
            }}
            value={volunteer.phone}
            margin="dense"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit(() => {
              fetch("/Create_Volunteer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(volunteer),
              });
              setVolunteer({ ...volunteer, name: "", phone: "" });
            })}
          >
            הוסף
          </Button>
          <Button onClick={handleClose}>סיים</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
