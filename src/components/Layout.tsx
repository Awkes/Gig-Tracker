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

    <main sx={{
      flexGrow: 1,
      width: '100%',
      maxWidth: 'maxWidth',
      margin: '0 auto',
      paddingX: [3, null, 0],
      paddingY: 3,
      display: 'grid',
      gridTemplateColumns: ['1fr', '1fr 1fr'],
      gap: 2,
    }}>
      {children}
    </main>

    <footer sx={{ textAlign: 'center', }}>
      <hr />
      Copyright &copy; Andreas Åkerlöf
    </footer>
  </div>
);

export default Layout;