/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);

  return (
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
}

export default Layout;