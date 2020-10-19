/** @jsx jsx */
import { jsx } from 'theme-ui';
import { NavLink as Link } from 'react-router-dom';

type Props = {
  children: string,
  to: string,
}

const NavLink = ({ children, to }: Props) => (
  <Link
    exact
    activeStyle={{ fontWeight: 'bold' }}
    sx={{
      display: 'block',
      padding: 2,
      paddingTop: ({ space }) => space[2]+2+'px',
      color: 'headerText',
      letterSpacing: 1,
      textDecoration: 'none',
      '&:after': {
        content: '""',
        display: 'block',
        backgroundColor: 'secondary',
        height: '2px',
        width: '100%',
        transform: 'scaleX(0)',
        transition: 'transform .2s',
      },
      '&:hover:after': { 
        transform: 'scaleX(1.2)',
      }
    }}
    to={to}
  >
    {children}
  </Link>
);

export default NavLink;