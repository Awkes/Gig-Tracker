/** @jsx jsx */
import { jsx } from 'theme-ui';

const Button = (props: any) => (
  <button 
    sx={{ 
      width: '100%',
      padding: 1,
      fontFamily: 'text',
      fontSize: 2,
      letterSpacing: 1,
      border: '1px solid',
      borderColor: 'border',
      borderRadius: 0,
      cursor: 'pointer',
      backgroundColor: 'primary',
      '&:disabled': {
        backgroundColor: 'secondary',
        cursor: 'default',
      }
    }} 
    {...props}
  />
);

export default Button;