/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, ChangeEvent, FormEvent } from 'react';

import useAuth from '../hooks/useAuth';
import Button from '../components/Button';
import Input from '../components/Input';

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

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    signIn(email, password);
  }

  return (
    <form
      onSubmit={handleSubmit}
      sx={{
        display: 'grid',
        gap: 2,
      }}
    >
      <h2 sx={{ margin: 0 }}>Sign in:</h2>
      <label>
        Email:<br />
        <Input type="email" name="email" onChange={handleInput} placeholder="user@host.se" />
      </label>
      <label >
        Password:<br />
        <Input type="password" name="password" onChange={handleInput} placeholder="password" />
      </label>
      <Button>
        Sign in
      </Button>
      {signInError && <span sx={{ color: 'error' }}>{signInError}</span>}
    </form>
  )
}

export default SingIn;