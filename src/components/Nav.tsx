/** @jsx jsx */
import { jsx } from 'theme-ui';

import routes from '../config/routes';
import NavLink from './NavLink';

const Nav = () => {
  const { gigsPath, addGigPath, statsPath } = routes;
  return (
    <nav>
      <ul 
        sx={{ 
          listStyleType: 'none', 
          margin: 0, 
          padding: 0,
          fontFamily: 'text',
          textAlign: 'center',
          '&>li': { 
            display: 'inline-block', 
            margin: 0, 
            padding: 0 ,
          },
        }}
      >
        <li>
          <NavLink to={gigsPath}>Gigs</NavLink>
        </li>
        <li>
          <NavLink to={addGigPath}>Add Gig</NavLink>
        </li>
        <li>
          <NavLink to={statsPath}>Statistics</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;