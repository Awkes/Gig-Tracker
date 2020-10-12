/** @jsx jsx */
import { NavLink } from 'react-router-dom';
import { jsx } from 'theme-ui';

const Nav = () => (
  <nav>
    <ul 
      sx={{ 
        listStyleType: 'none', 
        m: 0, 
        p: 0,
        '&>li': { 
          display: 'inline-block', 
          m: 0, 
          p: 0 ,
          '&>a': {
            display: 'block',
            padding: 2,
          }
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
)

export default Nav;