import { useContext } from 'react';

import AuthContext from "../contexts/AuthContext"

const useAuth = () => {
  const context = useContext<any>(AuthContext);
  return context;
}

export default useAuth;