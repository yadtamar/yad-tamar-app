import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

function RemovePopup({ isOpen }) {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>{"אנא המתן למחיקת משפחה"}</DialogTitle>
    </Dialog>
  );
}
export default RemovePopup;
