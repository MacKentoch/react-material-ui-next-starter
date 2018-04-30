// @flow

// #region imports
import React from 'react';
import { hydrate, render } from 'react-dom';
import injectTpEventPlugin from 'react-tap-event-plugin';
import smoothScrollPolyfill from 'smoothscroll-polyfill';
import { MuiThemeProvider } from 'material-ui/styles';
import theme from './style/theme';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';
import 'babel-polyfill';
// #endregion

// #region smoothscroll polyfill
smoothScrollPolyfill.polyfill();
// force polyfill (even if browser partially implements it)
window.__forceSmoothScrollPolyfill__ = true;
// #endregion

const ELEMENT_TO_BOOTSTRAP = 'root';
const bootstrapedElement = document.getElementById(ELEMENT_TO_BOOTSTRAP);

injectTpEventPlugin();

const renderApp = RootComponent => {
  const Application = () => (
    <AppContainer>
      <MuiThemeProvider theme={theme}>
        <RootComponent />
      </MuiThemeProvider>
    </AppContainer>
  );

  if (bootstrapedElement.hasChildNodes()) {
    hydrate(<Application />, bootstrapedElement);
  } else {
    render(<Application />, bootstrapedElement);
  }
};

renderApp(Root);

if (module.hot) {
  module.hot.accept('./Root', () => {
    const RootComponent = require('./Root').default;
    renderApp(RootComponent);
  });
}
