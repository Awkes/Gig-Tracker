/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ReactNode } from 'react';

import Header from './Header';

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => (
  <div>
    <Header />
    <main sx={{ padding: 2 }}>
      {children}
    </main>
    <hr />
    <footer>
      Copyright &copy; Andreas Åkerlöf
    </footer>
  </div>
);

export default Layout;