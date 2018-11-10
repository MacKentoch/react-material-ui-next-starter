// @flow

// #region imports
import 'babel-polyfill';
import React from 'react';
import { hydrate, render } from 'react-dom';
import smoothScrollPolyfill from 'smoothscroll-polyfill';
import { loadComponents, getState } from 'loadable-components';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './style/theme';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';
import AutProvider from './contexts/auth/providerComponent';
// #endregion

// #region smoothscroll polyfill
smoothScrollPolyfill.polyfill();
// force polyfill (even if browser partially implements it)
window.__forceSmoothScrollPolyfill__ = true;
window.snapSaveState = () => getState();
// #endregion

const ELEMENT_TO_BOOTSTRAP = 'root';
const bootstrapedElement = document.getElementById(ELEMENT_TO_BOOTSTRAP);

const renderApp = RootComponent => {
  const Application = () => (
    <AppContainer>
      <MuiThemeProvider theme={theme}>
        <AutProvider>
          <RootComponent />
        </AutProvider>
      </MuiThemeProvider>
    </AppContainer>
  );

  // needed for react-snap:
  if (bootstrapedElement.hasChildNodes()) {
    loadComponents().then(() => {
      hydrate(<Application />, bootstrapedElement);
    });
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
