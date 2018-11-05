// @flow

// #region imports
import React, { PureComponent } from 'react';
import { type Match, type Location, type RouterHistory } from 'react-router';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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

class About extends PureComponent<Props, State> {
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
              <CardHeader title="About" />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  About Page
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Just to POC routing
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={this.goPreviousRoute}>go previous</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </section>
    );
  }

  routeToHome = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
    }

    const { history } = this.props;
    history.push({ pathname: '/' });
  };

  goPreviousRoute = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
    }

    const { history } = this.props;
    history.goBack();
  };
}

export default withStyles(styles)(About);
