//Material theme
import { createMuiTheme } from "@material-ui/core";
import { teal, orange, red } from "@material-ui/core/colors";

export const darkTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: { main: '#ffdf6c' },
    secondary: { main: '#000000', light: '#ffdf6c' },
    caution: { main: red[500] },
    type: "dark"
  }
});

export const lightTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: { main: teal["A100"] },
    secondary: { main: orange["A100"], light: orange[500] },
    caution: { main: red[500] },
    type: "light"
  }
});

//export default theme;