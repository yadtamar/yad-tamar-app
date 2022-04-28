import AppBar from "../../components/AppBar/AppBar";
import neighboor from "../../assets/neighboor2.svg";
import { Typography, Grid } from "@mui/material";
import MainBlueButton from "../../components/styled/MainBlueButton";
import MainGreenButton from "../../components/styled/MainGreenButton";
import { useNavigate } from "react-router";
import SvgWave from "../../assets/svgIcons/SvgWave";

import "./WelcomePage.css";
function WelcomePage() {
  const navigate = useNavigate();

  return (
    <>
      <AppBar />
      <SvgWave />
      <img
        className="neigboor-img"
        src={neighboor}
        alt="neighboor"
        loading="lazy"
      ></img>
      <div className="homeBuble">
        <Grid container className="main-container">
          <Typography fontSize="40px" variant="h1" marginTop="10px">
            {"ברוך הבא ליד תמר"}
          </Typography>
          <Typography variant="subtitle">
            {
              "            על מנת להתחיל התקשרות יש ליצור משפחה חדשה או להצטרף למשפחה קיימת"
            }
          </Typography>
          <Grid
            item
            marginTop="6px"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "95%",
            }}
          >
            <MainBlueButton
              onClick={() => {
                navigate("/create-family");
              }}
            >
              {"צור משפחה"}
            </MainBlueButton>
            <MainGreenButton
              onClick={() => {
                navigate("/families");
              }}
            >
              {"בחר משפחה"}
            </MainGreenButton>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default WelcomePage;
