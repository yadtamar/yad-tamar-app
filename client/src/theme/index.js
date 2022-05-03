import { createTheme } from "@mui/material";
import { heIL } from "@mui/material/locale";
const theme = createTheme({
  heIL,
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small",
        style: { width: "90%" },
      },
    },
  },
  typography: {
    h1: {
      fontFamily: ["Varela Round", "cursive"].join(","),
      fontWeight: "400",
    },
    h4: {
      fontFamily: ["Varela Round", "cursive"].join(","),
      fontWeight: "600",
    },
    h5: {
      fontFamily: ["Varela Round", "cursive"].join(","),
      fontWeight: "600",
    },
    subtitle1: {
      fontFamily: ["Varela Round", "cursive"].join(","),
      fontWeight: "200",
    },
  },
  palette: {
    primary: {
      main: "#8Ca8e0",
    },
    secondary: {
      main: "#8EC371",
    },
    error: {
      main: "#E50914",
    },
    button: {
      main: "#E8E8E8",
    },
    text: {
      main: "#fff",
    },
  },
});
export default theme;
