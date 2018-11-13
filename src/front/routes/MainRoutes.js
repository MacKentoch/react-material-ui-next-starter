// @flow

// #region imports
import React from 'react';
import { Route, Switch } from 'react-router';
import { Home, About, PageNotFound } from './routes';
import LogoutRoute from '../components/logoutRoute';
// #endregion

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <LogoutRoute path="/logout" />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default MainRoutes;
