/** @jsx jsx */
import { jsx } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const Logo = () => (
  <h1 sx={{ 
    justifySelf: 'start', 
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    width: '250px',
    fontFamily: 'logo', 
    fontWeight: 'normal',
    color: 'headerText',
    cursor: 'default',
  }}>
    <FontAwesomeIcon icon={faMusic} sx={{ fontSize: 3 }} />
    <span sx={{ 
      paddingLeft: 2, 
      paddingBottom: '5px',
      fontSize: 5,
    }}>
      GigTracker
    </span>
  </h1>
);

export default Logo;