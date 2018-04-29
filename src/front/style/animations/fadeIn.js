// @flow

// #region constants
const DEFAULT_DURATION = '1s';
const DEFAULT_TIMING_FUNCTION = 'easeOut';
// #endregion

const fadeIn = {
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
      transform: 'none',
    },
  },
  fadeIn: {
    animation: {
      name: 'fadeIn',
      duration: DEFAULT_DURATION,
      timingFunction: DEFAULT_TIMING_FUNCTION,
    },
  },
};

export default fadeIn;
