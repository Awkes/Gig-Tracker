import React, { createContext, ReactNode, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { auth } from '../api';

const AuthContext = createContext({});

type Props = {
  children: ReactNode
}

const AuthContextProvider = ({ children }: Props) => {
  const user = sessionStorage.getItem('authUser');
  const [authUser, setAuthUser] = useState<object|null>(
    (typeof user === 'string' && JSON.parse(user)) || null
  ); 
  const [signInError, setSignInError] = useState<string|null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();

  async function signIn(email: string, password: string) {
    setLoading(true);
    try {
      const user = await auth(email, password);
      sessionStorage.setItem('authUser', JSON.stringify(user));
      setAuthUser(user)
    }
    catch(error) { 
      setAuthUser(null);
      setSignInError(error.message);
    }
    setLoading(false);
  }
  
  function signOut() {
    sessionStorage.removeItem('authUser');
    setAuthUser(null);
    history.push('/');
  }

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, signIn, signInError, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
export { AuthContextProvider }