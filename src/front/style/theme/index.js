// @flow

// #region imports
import { createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import pink from '@material-ui/core/colors/pink';
import grey from '@material-ui/core/colors/grey';
import spacing from '@material-ui/core/styles/spacing';
// #endregion

// #region constants
const white = '#FFFFFF';
const darkBlack = '#222222';
const fullBlack = '#4A4A4A';
// #endregion

const theme = createMuiTheme({
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  direction: 'ltr',
  palette: {
    primary1Color: cyan[500],
    primary2Color: cyan[700],
    primary3Color: grey[400],
    accent1Color: pink.A200,
    accent2Color: grey[100],
    accent3Color: grey[500],
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey[300],
    shadowColor: fullBlack,
  },
  // appBar: {
  //   color: indigo[900],
  // },
  // zIndex: {
  //   appBar: 1300,
  //   leftNavOverlay: 1100,
  //   leftNav: 1200,
  // },
});

export default theme;
