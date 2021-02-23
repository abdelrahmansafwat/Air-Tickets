/* eslint-disable import/no-anonymous-default-export */
export default () => ({
  root: {
    width: 320,
    height: 48,
    padding: 8,
  },
  switchBase: {
    padding: 11,
    color: '#2193b0',
    fontFamily: 'Roboto, Helvetica'
  },
  thumb: {
    width: 160,
    height: 26,
    backgroundColor: '#fff',
    borderRadius: 20,
    '&:before': {
      content: '"One way"',
    },
  },
  track: {
    background: 'linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)',
    opacity: '1 !important',
    borderRadius: 20,
    position: 'relative',
    '&:before, &:after': {
      display: 'inline-block',
      position: 'absolute',
      top: '50%',
      width: '50%',
      transform: 'translateY(-50%)',
      color: '#fff',
      textAlign: 'center',
      fontFamily: 'Roboto, Helvetica'
    },
    '&:before': {
      content: '"One way"',
      left: 4,
      opacity: 0,
    },
    '&:after': {
      content: '"Round Trip"',
      right: 4,
    },
  },
  checked: {
    '&$switchBase': {
      color: '#2193b0',
      transform: 'translateX(138px)',
      
    },
    '& $thumb': {
      backgroundColor: '#fff',
      '&:before': {
        content: '"Round Trip"',
      },
    },
    '& + $track': {
      background: 'linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)',
      '&:before': {
        opacity: 1,
      },
      '&:after': {
        opacity: 0,
      }
    },
  },
});
