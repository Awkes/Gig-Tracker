/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode,
}

const Box = ({ children }: Props) => (
  <div sx={{
    backgroundColor: 'tertiary',
    boxShadow: 1,
    borderRadius: 0,
    padding: 3,
    border: '1px solid',
    borderColor: 'border',
  }}>
    {children}
  </div>
);

export default Box;