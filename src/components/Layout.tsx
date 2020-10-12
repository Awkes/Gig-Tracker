/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ReactNode } from 'react';

import Nav from './Nav';

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => (
  <div>
    <header>
      <h1>Gig-Tracker</h1>
      <Nav />
    </header>
    <hr />
    <main>
      {children}
    </main>
    <hr />
    <footer>
      Copyright &copy; Andreas Åkerlöf
    </footer>
  </div>
);

export default Layout;