/** @jsx jsx */
import { jsx } from 'theme-ui';

const Textarea = (props: any) => (
  <textarea 
    sx={{ 
      width: '100%',
      padding: 1,
      fontFamily: 'text',
      fontSize: 2,
      letterSpacing: 1,
      border: '1px solid',
      borderColor: 'border',
      borderRadius: 0,
      backgroundColor: 'background',
      color: 'text',
    }} 
    {...props}
  />
);

export default Textarea;