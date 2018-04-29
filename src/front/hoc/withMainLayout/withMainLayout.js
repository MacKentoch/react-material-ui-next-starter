// @flow

// #region imports
import React, { Component } from 'react';
import wrapDisplayName from 'recompose/wrapDisplayName';
import classNames from 'classnames';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import { type Match, type Location, type RouterHistory } from 'react-router';
import Toolbar from 'material-ui/Toolbar';
// import List from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { withStyles } from 'material-ui/styles';
// import { withTheme } from 'material-ui/styles';
import appConfig from '../../config/appConfig';
import { type Menu } from '../../config/appConfig';
import styles from './styles';
import registerServiceWorker from '../../utils/sw/registerServiceWorker';
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
    menuButton: string,
    hide: string,
    drawerPaper: string,
    drawerPaperclose: string,
    toolBar: string,
    content: string,
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
          <div className={classes.root}>
            <AppBar
              position="absolute"
              className={classNames(
                classes.appBar,
                this.state.open && classes.appBarShift,
              )}
            >
              <Toolbar disableGutters={!drawerOpened}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(
                    classes.menuButton,
                    this.state.open && classes.hide,
                  )}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" noWrap>
                  {appName}
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(
                  classes.drawerPaper,
                  !this.state.open && classes.drawerPaperClose,
                ),
              }}
              open={this.state.open}
            >
              <div className={classes.toolbar}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              {/* <List>{mailFolderListItems}</List> */}
              <Divider />
              {/* <List>{otherMailFolderListItems}</List> */}
            </Drawer>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <BaseComponent {...passProps} />
            </main>
          </div>
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

    return compose(withRouter, withStyles(styles))(WithMainLayout);
  };
}
// #endregion

export default withMainLayout;
