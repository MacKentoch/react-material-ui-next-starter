// @flow

// #region devtools reducer
const initialState = {
  auth: {},
};

export const reducer = (
  state: any = initialState,
  action: { type: string, ...any },
): any => {
  /* eslint-disable no-unused-vars */
  switch (action.type) {
    // #region user context
    case 'AUTH_CHECK_IS_AUTHENTICATED':
    case 'AUTH_CHECK_TOKEN_IS_EXPIRED':
    case 'AUTH_SET_TOKEN':
    case 'AUTH_SET_USER_INFO':
    case 'AUTH_DISCONNECT_USER': {
      const { type, state: context, ...rest } = action;
      return { ...state, user: { context, ...rest } };
    }
    // #endregion

    default:
      return state;
  }
  /* eslint-enable no-unused-vars */
};
// #endregion

export default reducer;
