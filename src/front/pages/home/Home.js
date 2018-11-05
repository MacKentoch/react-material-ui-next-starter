// @flow

// #region imports
import React, { PureComponent } from 'react';
import { type Match, type Location, type RouterHistory } from 'react-router';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import styles from './styles';
// #endregion

// #region flow types
export type Props = {
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

export type State = {
  animated: boolean,

  ...any,
};
// #endregion

class Home extends PureComponent<Props, State> {
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
            <Card>
              <CardHeader title="Home" />
              <CardContent>
                <Typography variant="h1" gutterBottom>
                  Material Next starter
                </Typography>
                <Typography variant="body2" gutterBottom>
                  React 16.3+ - Material UI Next - babel 7 - react-router 4+ -
                  Webpack 4+ - react-hot-loader 4+ - workbox-webpack-plugin (=
                  PWA friendly)
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={this.goToAboutPage}>go to about</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </section>
    );
  }

  goToAboutPage = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
    }

    const { history } = this.props;
    history.push('/about');
  };
}

export default withStyles(styles)(Home);
