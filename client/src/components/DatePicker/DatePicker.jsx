import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import he from "moment/locale/he";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import moment from "moment";

export default function DatePicker({ value, setValue }) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} locale="he">
      <MobileDateTimePicker
        style={{ direction: "ltr" }}
        renderInput={(props) => <TextField {...props} />}
        value={value}
        onChange={(newValue) => {
          setValue(moment(newValue).valueOf());
        }}
      />
    </LocalizationProvider>
  );
}
