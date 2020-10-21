/** @jsx jsx */
import { jsx } from 'theme-ui';

type Props = {
  danger?: boolean
  [x:string]: any
}

const Button = ({ danger = false, ...props }: Props) => (
  <button 
    sx={{ 
      width: '100%',
      padding: 1,
      fontFamily: 'text',
      fontSize: 2,
      letterSpacing: 1,
      border: '1px solid',
      borderColor: danger ? 'error' : 'border',
      borderRadius: 0,
      cursor: 'pointer',
      backgroundColor: danger ? 'errorBg' : 'primary',
      '&:disabled': {
        backgroundColor: 'secondary',
        cursor: 'default',
      }
    }} 
    {...props}
  />
);

export default Button;