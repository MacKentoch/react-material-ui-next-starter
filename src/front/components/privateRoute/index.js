// @flow

// #region imports
import compose from 'recompose/compose';
import withUser from '../../contexts/user/consumerHOC';
import { withRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
// #endregion

export default compose(
  withRouter,
  withUser(),
)(PrivateRoute);
