import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import heart from "../../../assets/heart.png";
import { Typography } from "@mui/material";

import moment from "moment";

export default function SimpleDialog({
  open,
  toggleDetails,
  task_name,
  date,
  details,
}) {
  return (
    <Dialog
      onClick={() => {
        toggleDetails();
      }}
      open={open}
    >
      <DialogTitle
        style={{
          backgroundColor: "#8ca8e0",
          color: "white",
        }}
      >
        {task_name}
      </DialogTitle>
      <div style={{ minWidth: "250px" }}>
        <DialogContent>
          <Typography sx={{ fontWeight: "bold" }} variant="subtitle1">
            {"תאריך "}
          </Typography>
          <Typography variant="subtitle1">
            {moment(parseInt(date)).format("dddd, Do MMMM , YYYY, בשעה h:mm")}
          </Typography>
          <Typography sx={{ fontWeight: "bold" }} variant="subtitle1">
            {"פרטים "}
          </Typography>

          <Typography variant="subtitle1" paddingBottom={"80px"}>
            {details ? details : "אין פרטים נוספים אודות משמה זו"}
          </Typography>
        </DialogContent>
      </div>
      <img
        src={heart}
        style={{
          width: "50%",
          opacity: "0.3",
          position: "absolute",
          bottom: "0",
          left: "0",
        }}
      ></img>
    </Dialog>
  );
}
