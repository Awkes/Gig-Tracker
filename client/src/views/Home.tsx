/** @jsx jsx */
import { jsx } from 'theme-ui';

import Box from '../components/Box';
import SignIn from '../components/SignIn';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const { authUser } = useAuth();

  return (
    <div sx={{
      flexGrow: 1,
      width: '100%',
      maxWidth: 'maxWidth',
      margin: '0 auto',
      paddingX: [3, null, 0],
      paddingY: 3,
      display: 'grid',
      gridTemplateColumns: ['1fr', 'minmax(60%, auto) minmax(auto, 300px)'],
      gap: 3,
      fontFamily: 'text',
      letterSpacing: 1,
    }}>
      <main>
        <Box>
          <h2 sx={{ margin: 0 }}>
            Welcome to GigTracker!
          </h2>
          <p>
            This is a site that will help you keep track on gigs you've attended.
          </p>
        </Box>
      </main>
      <aside>
        <Box>
          {!authUser 
            ? <SignIn /> 
            : <div>
                <h2 sx={{ margin: 0 }}>User</h2>
                <p>Signed in as {authUser}</p>
              </div>
          }
        </Box>
      </aside>
    </div>
);
}

export default Home;