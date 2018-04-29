// @flow

// #region imports
import React from 'react';
import { Route, Switch } from 'react-router';
import { Home, About, PageNotFound } from './routes';
// #endregion

console.log('');

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default MainRoutes;
