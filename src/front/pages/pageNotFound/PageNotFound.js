// @flow weak

// #region imports
import React, { PureComponent } from 'react';
import { type Match, type Location, type RouterHistory } from 'react-router';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import cx from 'classnames';
import styles from './styles';
// #endregion

// #region flow types
type Props = {
  // react-router 4:
  match: Match,
  location: Location,
  history: RouterHistory,

  // jss from withStyles hoc:
  classes: {
    flexible: string,
    pageContainer: string,
  },

  ...any,
};

type State = {
  animated: boolean,

  ...any,
};
// #endregion

class PageNotFound extends PureComponent<Props, State> {
  state = {
    animated: true,
  };

  render() {
    const { classes } = this.props;
    const { animated } = this.state;

    return (
      <section
        className={cx(classes.pageContainer, classes.flexible, {
          fadeIn: animated,
        })}
      >
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h2>
              <i className="fa fa-frown-o" ariaHidden="true" />
              &nbsp; Sorry... This page does not exist
            </h2>
          </Grid>
        </Grid>
      </section>
    );
  }
}

export default withStyles(styles)(PageNotFound);
