// @flow

// #region imports
import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../pages/home';
import About from '../pages/about';
import PageNotFound from '../pages/pageNotFound';
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
