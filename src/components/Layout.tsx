/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ReactNode } from 'react';

import Header from './Header';

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => (
  <div sx={{
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  }}>
    <Header />

    {children}

    <footer sx={{ textAlign: 'center', }}>
      <hr />
      Copyright &copy; Andreas Åkerlöf
    </footer>
  </div>
);

export default Layout;