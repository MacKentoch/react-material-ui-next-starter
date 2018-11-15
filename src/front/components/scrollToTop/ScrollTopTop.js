// @flow

// #region imports
import React, { Component } from 'react';
import { type RouterProps } from '../../types/react-router';
// #endregion

// #region flow types
type Props = {
  children: React.ReactNode,

  ...any,
} & RouterProps;

type State = any;
// #endregion

class ScrollToTop extends Component<Props, State> {
  // #region lifecycle
  componentDidUpdate(prevProps: Props) {
    if (window) {
      const { location: prevLocation } = prevProps;
      const { location: nextLocation } = this.props;

      if (prevLocation !== nextLocation) {
        window.scrollTo(0, 0);
      }
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
  // #endregion
}

export default ScrollToTop;
