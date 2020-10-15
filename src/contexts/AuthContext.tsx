import React, { createContext, ReactNode, useState } from 'react';

const tempUser = 'user@host.se';
const tempPass = 'password';

const AuthContext = createContext({});

type Props = {
  children: ReactNode
}

const AuthContextProvider = ({ children }: Props) => {
  const [authUser, setAuthUser] = useState<string|null>(sessionStorage.getItem('authUser') || null);
  const [signInError, setSignInError] = useState<string|null>(null);

  function signIn(email: string, password: string) {
    if (email.toLowerCase() === tempUser && password === tempPass) {
      sessionStorage.setItem('authUser', email.toLowerCase());
      setAuthUser(email.toLowerCase());
      setSignInError(null);
    }
    else {
      setAuthUser(null);
      setSignInError('Invalid credentials.')
    }
  }

  function signOut() {
    sessionStorage.removeItem('authUser');
    setAuthUser(null);
  }

  return (
    <AuthContext.Provider value={{ authUser, signIn, signOut, signInError }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
export { AuthContextProvider }