/** @jsx jsx */
import { jsx } from 'theme-ui';

const Input = (props: any) => {
  const { error } = props;
  return (
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
      {...props}
    />
  );
}

export default Input;