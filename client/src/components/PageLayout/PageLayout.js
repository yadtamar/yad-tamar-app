import AppBar from "../AppBar/AppBar";
import ColorFill from "../ColorFill/ColorFill";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import SideBarButtons from "../SideBarButtons/SideBarButtons";

const PageLayout = ({ pageComponent, headerText }) => {
  return (
    <>
      <AppBar />
      <ColorFill text={headerText} />
      <Grid container className="gridContainer">
        <Grid item xs={2}>
          <Grid container alignItems="center" flexDirection="column">
            <Typography mt="30px" fontSize="22px" variant="h4">
              יעקוב ישראלי
            </Typography>
            <Grid
              container
              justifyContent="center"
              marginTop="10px"
              marginBottom="10px"
            >
              <Typography
                variant="h4"
                fontSize="14px"
                color="secondary"
                marginRight="5px"
              >
                רכז קהילה
              </Typography>
              <svg
                width="12"
                height="15"
                viewBox="0 0 11 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.51562 11.3495H10.2656V12.5995H1.51562V11.3495ZM5.89062 10.0995C4.56454 10.0995 3.29277 9.5727 2.35509 8.63502C1.41741 7.69734 0.890625 6.42557 0.890625 5.09949C0.890625 3.7734 1.41741 2.50164 2.35509 1.56395C3.29277 0.626272 4.56454 0.0994873 5.89062 0.0994873C7.21671 0.0994873 8.48848 0.626272 9.42616 1.56395C10.3638 2.50164 10.8906 3.7734 10.8906 5.09949C10.8906 6.42557 10.3638 7.69734 9.42616 8.63502C8.48848 9.5727 7.21671 10.0995 5.89062 10.0995V10.0995Z"
                  fill="#69B572"
                />
              </svg>
            </Grid>
            <Divider width="90%" />
            <Grid container flexDirection="column" width="92%" marginTop="20px">
              <SideBarButtons />
            </Grid>
          </Grid>
        </Grid>
        <Grid item className="layoutDivider" xs={0.2}></Grid>
        <Grid item xs={9.8}>
          {pageComponent}
        </Grid>
      </Grid>
    </>
  );
};
export default PageLayout;
