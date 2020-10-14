import React, { ReactNode } from 'react';

import SignInView from '../views/SignInView';
import useAuth from '../hooks/useAuth';

type Props = {
  children: ReactNode,
}

const AuthRequired = ({ children }: Props) => {
  const { authUser } = useAuth();
  return authUser ? <>{children}</> : <SignInView />;
}

export default AuthRequired;