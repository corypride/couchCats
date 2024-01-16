import { createTheme } from "@mui/material";

// Creating customized theme according
// https://mui.com/material-ui/customization/color/
const theme = createTheme({
  palette: {
    primary: {
      main: '#642B6B',
    },
    secondary: {
      main: '#d993ab',
    },
    accent: {
      main: '#ff9610',
      secondary:'#d993ab'
    },
    box: {
        main: '#d3d3d3'
    },
    attention: {
      main: '#D92F2F',
    }
  },
});

export default theme;
