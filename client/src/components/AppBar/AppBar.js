import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import logo from "../../assets/yad-tamar-logo.png";
import "./AppBar.css";

export default function NavBar() {
  return (
    <AppBar elevation={0} className="app-header">
      <Grid item className="logo-container">
        <Grid item>
          <img className="logo" src={logo}></img>
        </Grid>
        <Grid container className="text-container">
          <Typography variant="h4" lineHeight="1" fontSize="1.5rem">
            {"יד תמר"}
          </Typography>
          <Typography style={{ opacity: "0.5" }} variant="subtitle">
            {"תמיכה במשפחות חולי סרטן ובמצבי משבר"}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Button className="nav-button">{"בית"}</Button>
        <Button className="nav-button">{"עלינו"}</Button>
        <Button className="nav-button">{"צור קשר"}</Button>
      </Grid>
    </AppBar>
  );
}
