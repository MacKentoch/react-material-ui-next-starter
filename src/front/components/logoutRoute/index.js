// @flow

// #region imports
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import withAuth from '../../contexts/auth/consumerHOC';
import LogoutRoute from './LogoutRoute';
// #endregion

export default compose(
  withRouter,
  withAuth(),
)(LogoutRoute);
