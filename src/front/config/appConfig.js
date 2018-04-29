// @flow

// #region flow types
export type Menu = {
  id: number,
  title: string,
  routeName: string,
};
// #endregion

// #region appConfig
const appConfig = {
  APP_NAME: 'reactMaterialNextStarter',

  // App Drawer:
  drawer: {
    width: 240,
    menus: [
      { id: 1, title: 'Home', routeName: '/' },
      { id: 2, title: 'About', routeName: 'about' },
    ],
  },

  // sw path
  sw: {
    path: 'public/assets/sw.js',
  },
};
// #endregion

export default appConfig;
