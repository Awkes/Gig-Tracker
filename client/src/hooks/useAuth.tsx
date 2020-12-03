import { useContext } from 'react';

import AuthContext from "../contexts/AuthContext"

const useAuth = () => {
  const { authUser, signIn, signInError, signOut, loading } = useContext<any>(AuthContext);
  return { authUser, signIn, signInError, signOut, loading };
}

export default useAuth;