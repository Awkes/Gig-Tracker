import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const GuardedRoute = (props: any) => {
  const { authUser } = useAuth();

  return (
    <Route {...props}>
      {authUser 
        ? <>{props.children}</>
        : <Redirect to="/" />
      }
    </Route> 
  );
}

export default GuardedRoute;