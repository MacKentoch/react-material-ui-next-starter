// @flow

// #region imports
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { type AuthContextProps } from '../../contexts/auth/consumerHOC';
import { type RouterProps } from '../../types/react-router';
// #endregion

// #region flow types
export type Props = {
  // parent
  component: any,
  path: string,

  ...any,
} & AuthContextProps &
  RouterProps;

export type State = any;
// #endregion

class PrivateRoute extends Component<Props, State> {
  // #region lifecycle
  render() {
    const { component: InnerComponent, ...rest } = this.props;
    const { location, isAuthenticated } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <InnerComponent {...props} />
          ) : (
            <Redirect to={{ pathname: '/', state: { from: location } }} />
          )
        }
      />
    );
  }
  // #endregion
}

export default PrivateRoute;
