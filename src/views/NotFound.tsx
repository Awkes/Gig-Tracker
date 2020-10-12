/** @jsx jsx */
import { Link } from 'react-router-dom';
import { jsx } from 'theme-ui';

const NotFound = () => (
  <div>
    <h2>Page not found!</h2>
    <p>
      <Link to="/">Go back to main page.</Link>
    </p>
  </div>
);

export default NotFound;