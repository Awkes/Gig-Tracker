/** @jsx jsx */
import { jsx } from 'theme-ui';

type Props = {
  error?: boolean,
  [x:string]: any
}

const Input = ({ error, ...rest }: Props) => (
  <input 
    sx={{ 
      width: '100%',
      padding: 1,
      fontFamily: 'text',
      fontSize: 2,
      color: 'text',
      letterSpacing: 1,
      border: '1px solid',
      borderColor: 'border',
      borderRadius: 0,
      backgroundColor: error ? 'errorBg' : 'background'
    }} 
    {...rest}
  />
);

export default Input;