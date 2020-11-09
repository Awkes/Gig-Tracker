/** @jsx jsx */
import { jsx } from 'theme-ui';

const Input = (props: any) => (
  <input 
    sx={{ 
      width: '100%',
      padding: 1,
      fontFamily: 'text',
      fontSize: 2,
      letterSpacing: 1,
      border: '1px solid',
      borderColor: 'border',
      borderRadius: 0,
    }} 
    {...props}
  />
);

export default Input;