/** @jsx jsx */
import { jsx } from 'theme-ui';
import { keyframes } from '@emotion/core';

const stretchDelay = keyframes`
  0%, 40%, 100% { 
    transform: scaleY(0.4);
  }  
  20% { 
    transform: scaleY(1.0);
  }
`;

const Spinner = () => (
  <div sx={{
    margin: '100px auto',
    width: '50px',
    height: '40px',
    textAlign: 'center',
    fontSize: '10px',
    '& > div': {
      backgroundColor: 'primary',
      height: '100%',
      width: '6px',
      margin: '1px',
      display: 'inline-block',
      animationName: stretchDelay,
      animationDuration: '1.2s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'ease-in-out',
    }
  }}>
    <div />
    <div sx={{ animationDelay: '-1.1s' }}></div>
    <div sx={{ animationDelay: '-1.0s' }}></div>
    <div sx={{ animationDelay: '-0.9s' }}></div>
    <div sx={{ animationDelay: '-0.8s' }}></div>
  </div>
);

export default Spinner;