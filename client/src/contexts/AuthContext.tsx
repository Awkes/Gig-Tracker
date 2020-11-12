import React, { createContext, ReactNode, useState } from 'react';

const AuthContext = createContext({});

type Props = {
  children: ReactNode
}

const AuthContextProvider = ({ children }: Props) => {
  const [authUser, setAuthUser] = useState<string|null>(sessionStorage.getItem('authUser') || null); 

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
export { AuthContextProvider }