/** @jsx jsx */
import { jsx } from 'theme-ui';

import NavLink from './NavLink';

const Nav = () => (
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
          <NavLink to="/">Gigs</NavLink>
        </li>
        <li>
          <NavLink to="/add-gig">Add Gig</NavLink>
        </li>
        <li>
          <NavLink to="/stats">Statistics</NavLink>
        </li>
      </ul>
    </nav>
  );

export default Nav;