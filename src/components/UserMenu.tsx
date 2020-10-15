/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState } from 'react';

import useAuth from '../hooks/useAuth';

const UserMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { authUser, signOut } = useAuth();
  
  function toggleMenu() {
    setMenuOpen(state => !state);
  } 
  
  return (
    <nav sx={{ position: 'relative' }}>
      <button
        onClick={toggleMenu}
        sx={{
          display: 'block',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: 'primary',
          outline: 'none',
          '&:hover': {

          }
        }} 
      />
      {menuOpen && (
        <div sx={{
          position: 'absolute',
          right: 0,
          marginTop: 2,
          padding: 2,
          display: 'grid',
          justifyItems: 'center',
          gap: 2,
          backgroundColor: 'secondary',
          borderColor: 'primary',
          border: '1px solid',
          fontFamily: 'text',
          fontSize: 2,
          letterSpacing: 1,
        }}>
          <div sx={{
            backgroundColor: 'primary',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
          }} />
          <div>
            {authUser}
          </div>
          <button 
            onClick={signOut}
            sx={{ cursor: 'pointer' }}
            type="button" 
          >
            Sign out
          </button>
        </div>
      )}
    </nav>
  );
}

export default UserMenu;