/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode,
  noPadding?: boolean
}

const Box = ({ children, noPadding = false }: Props) => (
  <div sx={{
    backgroundColor: 'tertiary',
    boxShadow: 1,
    borderRadius: 0,
    padding: noPadding ? 0 : 3,
    border: '1px solid',
    borderColor: 'border',
  }}>
    {children}
  </div>
);

export default Box;