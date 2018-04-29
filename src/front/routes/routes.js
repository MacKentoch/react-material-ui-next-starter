// @flow

// #region imports
import loadable from 'loadable-components';
// #endregion

export const Home = loadable(() => import('../pages/home'));
export const About = loadable(() => import('../pages/about'));
export const PageNotFound = loadable(() => import('../pages/pageNotFound'));
