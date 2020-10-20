/** @jsx jsx */
import { jsx } from 'theme-ui';

import Box from '../components/Box';

const NotFound = () => (
  <main sx={{
    flexGrow: 1,
    width: '100%',
    minWidth: 'minWidth',
    maxWidth: ['100%', 'maxWidth'],
    margin: '0 auto',
    paddingX: [3, null, 0],
    paddingY: 3,
    display: 'grid',
    gap: 3,
    fontFamily: 'text',
    letterSpacing: 1,
  }}>
    <Box error>
      <h2 sx={{ margin: 0 }}>Page not found!</h2>
      <p sx={{ marginBottom: 0 }}>
        The page you are looking for can't be found.
      </p>
    </Box>
  </main>
);

export default NotFound;