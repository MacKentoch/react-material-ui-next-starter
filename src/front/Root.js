// @flow

// #region imports
import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import withMainLayout from './hoc/withMainLayout';
import MainRoutes from './routes/MainRoutes';
import fadeIn from './style/animations/fadeIn';
// #endregion

// #region style (global styles)
const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    body: {
      margin: 0,
    },
    ...fadeIn,
  },
});
// #endregion

// #region constants
const history = createHistory();
const App = compose(
  withStyles(styles),
  withMainLayout(),
)(MainRoutes);
// #endregion

class Root extends Component {
  render() {
    return (
      <Router history={history}>
        <App />
      </Router>
    );
  }
}

export default Root;
