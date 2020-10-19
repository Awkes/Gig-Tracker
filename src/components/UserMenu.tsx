/** @jsx jsx */
import { jsx } from 'theme-ui';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import Button from './Button';
import useAuth from '../hooks/useAuth';

const UserMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { authUser, signOut } = useAuth();
  const menuRef = useRef<any>(null);
  
  function toggleMenu() {
    setMenuOpen(state => !state);
  }

  useEffect(() => {
    function clickOutside(e: Event) {
      if (!menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      };
    };

    if (menuRef.current !== null) {
      document.addEventListener('click', clickOutside, false);
      return () => document.removeEventListener('click', clickOutside, false);
    }
  });
  
  return (
    <nav ref={menuRef} sx={{ position: 'relative' }}>
      <button
        onClick={toggleMenu}
        sx={{
          display: 'block',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: 'secondary',
          outline: 'none',
        }} 
      >
        <FontAwesomeIcon icon={faUser} />
      </button>
      {menuOpen && (
        <div sx={{
          position: 'absolute',
          right: 0,
          marginTop: 2,
          padding: 2,
          display: 'grid',
          justifyItems: 'center',
          gap: 2,
          backgroundColor: 'tertiary',
          border: '1px solid',
          borderColor: 'border',
          borderRadius: 0,
          fontFamily: 'text',
          fontSize: 2,
          letterSpacing: 1,
          boxShadow: 0,
        }}>
          <div>
            {authUser}
          </div>
          <Button 
            onClick={signOut}
            type="button" 
          >
            Sign out
          </Button>
        </div>
      )}
    </nav>
  );
}

export default UserMenu;