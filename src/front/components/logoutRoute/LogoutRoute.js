// @flow

// #region imports
import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { type AuthContextProps } from '../../contexts/auth/consumerHOC';
import { type RouterProps } from '../../types/react-router';
// #endregion

// #region flow types
type Props = {
  ...any,
} & RouterProps &
  AuthContextProps;

type State = any;
// #endregion

class LogoutRoute extends PureComponent<Props, State> {
  // #region lifecycle
  componentDidMount() {
    const { disconnectUser } = this.props;
    disconnectUser();
  }

  render() {
    return (
      <Route {...this.props}>
        <Redirect to={{ pathname: '/login' }} />
      </Route>
    );
  }
  // #endregion
}

export default LogoutRoute;
