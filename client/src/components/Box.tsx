/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode,
  noPadding?: boolean,
  error?: boolean
}

const Box = ({ children, noPadding = false, error = false }: Props) => (
  <div sx={{
    backgroundColor: error ? 'errorBg' : 'tertiary',
    boxShadow: 1,
    borderRadius: 0,
    padding: noPadding ? 0 : 3,
    border: '1px solid',
    borderColor: error ? 'error' : 'border',
    maxWidth: '100%',
    overflow: 'hidden',
  }}>
    {children}
  </div>
);

export default Box;