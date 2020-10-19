/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ReactNode } from 'react';

import Header from './Header';
import Footer from './Footer';

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => (
  <div sx={{
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'space-between',
  }}>
    <Header />

    {children}

    <Footer />
  </div>
);

export default Layout;