/** @jsx jsx */
import { jsx } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Logo = () => (
  <h1 sx={{ 
    margin: 0,
    width: '250px',
    fontFamily: 'logo', 
    fontWeight: 'normal',
    color: 'dark',
    cursor: 'default',
  }}>
    <Link 
      sx={{ 
        color: 'dark', 
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
      }}
      to="/" 
    >
      <FontAwesomeIcon icon={faMusic} sx={{ fontSize: 3 }} />
      <span sx={{ 
        paddingLeft: 2, 
        paddingBottom: '5px',
        fontSize: 5,
      }}>
        GigTracker
      </span>
    </Link>
  </h1>
);

export default Logo;