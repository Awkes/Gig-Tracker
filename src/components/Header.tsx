/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui';

import Logo from './Logo';
import Nav from './Nav';
import Switch from './Switch';
import UserMenu from './UserMenu';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { authUser } = useAuth();
  const [colorMode, setColorMode] = useColorMode();

  function toggleColorMode() {
    setColorMode(colorMode === 'default' ? 'dark' : 'default');
  }

  return (
    <header sx={{
      position: 'sticky',
      top: 0,
      display: 'grid',
      gridTemplateColumns: authUser ? ['auto 40px 32px', 'auto auto 40px 32px'] : 'auto 30px',
      gap: 2,
      alignItems: 'center',
      justifyItems: 'left',
      minWidth: 'minWidth',
      minHeight: '70px',
      paddingY: 2,
      paddingX: [2, 3],
      backgroundColor: 'primary',
      boxShadow: 0,
    }}>
      <Logo />

      {authUser && (
        <div sx={{ 
          order: [3, 'initial'], 
          gridColumn: ['1/4', 'initial'],
          justifySelf: ['center', 'end']
        }}>
          <Nav />
        </div>
      )}

      <Switch 
        checked={colorMode === 'dark'}
        onChange={toggleColorMode}
      />

      {authUser && <UserMenu />}
    </header>
  );
}

export default Header;