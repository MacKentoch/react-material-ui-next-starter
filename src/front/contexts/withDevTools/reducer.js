// @flow

// #region devtools reducer
const initialState = {
  user: {},
};

export const reducer = (
  state: any = initialState,
  action: { type: string, ...any },
): any => {
  /* eslint-disable no-unused-vars */
  switch (action.type) {
    // #region user context
    case 'USER_REGISTER_REQUEST':
    case 'USER_REGISTER_SUCCESS':
    case 'USER_REGISTER_ERROR':
    case 'USER_LOGIN_REQUEST':
    case 'USER_LOGIN_SUCCESS':
    case 'USER_LOGIN_ERROR':
    case 'USER_LOGOUT_REQUEST':
    case 'USER_LOGOUT_SUCESS':
    case 'USER_LOGOUT_ERROR': {
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