import React from "react";
import { Typography } from "@mui/material";
function FormLabel({ text }) {
  return (
    <Typography variant="h4" fontSize="17px" marginTop="10px">
      {text}
    </Typography>
  );
}

export default FormLabel;
