import { createTheme } from "@mui/material";

// Creating customized theme according
// https://mui.com/material-ui/customization/color/
const theme = createTheme({
  palette: {
    primary: {
      main: '#642B6B',
    },
    secondary: {
      main: "#00897b",
    },
    box: {
        main: '#d3d3d3',
    }
  },
});

export default theme;
