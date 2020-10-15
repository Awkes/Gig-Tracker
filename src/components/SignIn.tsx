/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, ChangeEvent, MouseEvent } from 'react';

import useAuth from '../hooks/useAuth';

const SingIn = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { signIn, signInError } = useAuth();

  function handleInput(e: ChangeEvent) {
    const { name, value } = e.currentTarget as HTMLInputElement;
    switch (name) {
      case 'email':
        setEmail(value);
        return;
      case 'password':
        setPassword(value);
        return;
    }
  }

  function handleSubmit(e: MouseEvent) {
    e.preventDefault();
    signIn(email, password);
  }

  return (
    <form 
      sx={{
        display: 'grid',
        width: 'fit-content',
        gap: 2,
      }}
    >
      <h2>Sign in:</h2>
      <label sx={{ display: 'flex', justifyContent: 'space-between' }}>
        Email (user@host.se):
        <input type="email" name="email" onChange={handleInput} sx={{ marginLeft: 2 }} />
      </label>
      <label sx={{ display: 'flex', justifyContent: 'space-between' }}>
        Password (password):
        <input type="password" name="password" onChange={handleInput} sx={{ marginLeft: 2 }} />
      </label>
      <button onClick={handleSubmit} sx={{ cursor: 'pointer' }}>
        Sign in
      </button>
      {signInError && <span sx={{ color: 'error' }}>{signInError}</span>}
    </form>
  )
}

export default SingIn;