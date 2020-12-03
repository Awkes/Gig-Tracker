/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'react-router-dom';

import Box from '../components/Box';
import SignIn from '../components/SignIn';
import useAuth from '../hooks/useAuth';
import penguinpiano from '../assets/images/penguinpiano.svg';
import routes from '../config/routes';

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
          <section sx={{ 
            display: 'grid',
            gridTemplateColumns: ['1fr', '1fr 1fr'],
            gap: 4,
          }}>
            <img 
              src={penguinpiano} 
              alt="Penguin playing piano" 
              sx={{ 
                width: '100%', 
                maxWidth: '100%',
              }} 
            />
            <article>
              <h2 sx={{ margin: 0 }}>
                Welcome to GigTracker!
              </h2>
              <p>
                This app will help you keep track of gigs you've attended.
              </p>
              <p>
                GigTracker will also provide you with some nice to know statistics for all your gigs.
              </p>
              <p>
                To get started sign in or <Link to={routes.registerPath} 
                sx={{ color: 'text', fontWeight: 'bold' }}
                >register</Link> a new user.
              </p>
            </article>
          </section>
        </Box>
      </main>
      <aside>
        <Box>
          {!authUser 
            ? <SignIn /> 
            : <div>
                <h2 sx={{ margin: 0 }}>User</h2>
                <p>Signed in as {authUser.email}</p>
              </div>
          }
        </Box>
      </aside>
    </div>
);
}

export default Home;