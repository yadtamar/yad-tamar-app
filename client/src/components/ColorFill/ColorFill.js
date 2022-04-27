import { Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./ColorFill.css";
import { useNavigate } from "react-router";
const ColorFill = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div className="colorFill">
      <div className="main-div">
        <ArrowForwardIcon
          fontSize="large"
          color="text"
          className="back-icon"
          onClick={() => {
            navigate(-1);
          }}
        />
        <Typography className="location-text" variant="h1">
          {text}
        </Typography>
      </div>
    </div>
  );
};

export default ColorFill;