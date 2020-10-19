import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from "../contexts/AuthContext"

const tempUser = 'user@host.se';
const tempPass = 'password';

const useAuth = () => {
  const { authUser, setAuthUser } = useContext<any>(AuthContext);
  const [signInError, setSignInError] = useState<string|null>(null);
  const history = useHistory();

  function signIn(email: string|undefined, password: string|undefined) {
    if (email?.toLowerCase() === tempUser && password === tempPass) {
      sessionStorage.setItem('authUser', email.toLowerCase());
      setAuthUser(email.toLowerCase());
      setSignInError(null);
    }
    else {
      setAuthUser(null);
      setSignInError('Invalid credentials.');
    }
  }
  
  function signOut() {
    sessionStorage.removeItem('authUser');
    setAuthUser(null);
    history.push('/');
  }

  return { authUser, signIn, signInError, signOut };
}

export default useAuth;