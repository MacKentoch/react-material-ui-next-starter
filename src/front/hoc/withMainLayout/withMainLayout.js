// @flow

// #region imports
import React, { Component } from 'react';
import wrapDisplayName from 'recompose/wrapDisplayName';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { withRouter } from 'react-router';
import { type Match, type Location, type RouterHistory } from 'react-router';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import {
  withStyles,
  createGenerateClassName,
  jssPreset,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import appConfig from '../../config/appConfig';
import { type Menu } from '../../config/appConfig';
import styles from './styles';
import registerServiceWorker from '../../utils/sw/registerServiceWorker';
// import { mainListItems, secondaryListItems } from './listItems';
// #endregion

// #region flow types
type Props = {
  // from withRouter HOC:
  match: Match,
  location: Location,
  history: RouterHistory,

  // from withTheme HOC,
  theme: any,

  // from withStyles HOC:
  classes: {
    root: string,
    appBar: string,
    appBarShift: string,
    toolbar: string,
    toolbarIcon: string,
    menuButton: string,
    menuButtonHidden: string,
    title: string,
    drawerPaper: string,
    appBarSpacer: string,
    content: string,
    chartContainer: string,
    tableContainer: string,
    h5: string,
  },
};

type State = {
  appName: string,
  drawerOpened: boolean,
  drawerMenus: Array<Menu>,
};
// #endregion

// #region constants
const { menus } = appConfig.drawer;
const { APP_NAME } = appConfig;
// we need it to avoid prod bundle style mess ('case code splitting and lazy loading with jss)
const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'stupid-jss',
});
const jss = create(jssPreset());
// #endregion

// #region withMainLayout HOC
function withMainLayout() {
  return BaseComponent => {
    // #region returned Component
    class WithMainLayout extends Component<Props, State> {
      state = {
        appName: APP_NAME,
        drawerOpened: false,
        drawerMenus: menus,
      };

      // #region lifecycle
      componentDidMount() {
        // register service worker (no worry about multiple attempts to register, browser will ignore when already registered)
        registerServiceWorker();
      }

      render() {
        const { drawerOpened, appName } = this.state;
        /* eslint-disable no-unused-vars */
        const { classes, history, location, match, ...passProps } = this.props;
        /* eslint-enable no-unused-vars */

        return (
          <JssProvider jss={jss} generateClassName={generateClassName}>
            <React.Fragment>
              <CssBaseline />
              <div className={classes.root}>
                <AppBar
                  position="absolute"
                  className={classNames(
                    classes.appBar,
                    drawerOpened && classes.appBarShift,
                  )}
                >
                  <Toolbar
                    disableGutters={!drawerOpened}
                    className={classes.toolbar}
                  >
                    <IconButton
                      color="inherit"
                      aria-label="Open drawer"
                      onClick={this.handleDrawerOpen}
                      className={classNames(
                        classes.menuButton,
                        drawerOpened && classes.menuButtonHidden,
                      )}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography
                      component="h1"
                      variant="h6"
                      color="inherit"
                      noWrap
                      className={classes.title}
                    >
                      {appName || ''}
                    </Typography>
                    <IconButton color="inherit">
                      <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </Toolbar>
                </AppBar>
                <Drawer
                  variant="permanent"
                  classes={{
                    paper: classNames(
                      classes.drawerPaper,
                      !drawerOpened && classes.drawerPaperClose,
                    ),
                  }}
                  open={drawerOpened}
                >
                  <div className={classes.toolbarIcon}>
                    <IconButton onClick={this.handleDrawerClose}>
                      <ChevronLeftIcon />
                    </IconButton>
                  </div>
                  <Divider />
                  {/* <List>{mainListItems}</List> */}
                  <Divider />
                  {/* <List>{secondaryListItems}</List> */}
                </Drawer>
                <main className={classes.content}>
                  <BaseComponent {...passProps} />
                </main>
              </div>
            </React.Fragment>
          </JssProvider>
        );
      }
      // #endregion

      // #region drawer toggle
      toggleDrawer = () =>
        this.setState(({ drawerOpened: prevDrawerOpened }) => ({
          drawerOpened: !prevDrawerOpened,
        }));

      handleDrawerOpen = () => {
        this.setState({ drawerOpened: true });
      };

      handleDrawerClose = () => {
        this.setState({ drawerOpened: false });
      };
      // #endregion

      // #region route to click
      routeTo = routeName => event => {
        if (event) {
          event.preventDefault();
        }
        const { history } = this.props;
        history.push({ pathname: routeName });
      };
      // #endregion
    }
    // #endregion

    // #region add static displayName for dev
    /* eslint-disable no-process-env */
    if (process.env.NODE_ENV !== 'production') {
      // HOC would obfuscate component name, this trick is helpful for dev (we don't care in production)
      WithMainLayout.displayName = wrapDisplayName(
        BaseComponent,
        'withMainLayout',
      );
    }
    /* eslint-enable no-process-env */
    // #endregion

    return compose(
      withRouter,
      withStyles(styles),
    )(WithMainLayout);
  };
}
// #endregion

export default withMainLayout;
