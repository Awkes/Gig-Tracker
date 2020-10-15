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
      display: 'grid',
      gridTemplateColumns: authUser ? ['auto 50px 32px', 'auto auto 50px 32px'] : 'auto 30px',
      gap: 2,
      alignItems: 'center',
      justifyItems: 'center',
      minWidth: 'minWidth',
      paddingY: 2,
      paddingX: [2, 3],
      backgroundColor: 'secondary',
      boxShadow: '0px 0px 5px #000',
    }}>
      <Logo />

      {authUser && (
        <div sx={{ 
          order: [3, 'initial'], 
          gridColumn: ['1/4', 'initial'],
          justifySelf: [null, 'end']
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