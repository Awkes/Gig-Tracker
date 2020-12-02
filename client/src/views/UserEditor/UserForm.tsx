/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ChangeEvent, FormEvent } from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

type Props = {
  handleInput: (e: ChangeEvent) => void,
  handleSubmit: (e: FormEvent) => void,
  name: string, 
  email: string, 
  password: string, 
  passwordConfirmation: string,
  validName: () => boolean,
  validEmail: () => boolean,
  validPass: () => boolean,
  validPassConf: () => boolean,
  authUser: object,
  error: string|null
}

const UserForm = ({ 
  handleInput, 
  handleSubmit, 
  name, 
  email, 
  password, 
  passwordConfirmation,
  validName,
  validEmail,
  validPass,
  validPassConf,
  authUser,
  error
}: Props) => {
  return (
    <form
      onSubmit={handleSubmit}
      sx={{
        display: 'grid',
        gap: 2,
        paddingLeft: [0, 3, 4]
      }}
    >
      <label>
        Name (4-50 characters):<br />
        <Input 
          type="name" 
          name="name"
          value={name}
          minLength={4} 
          maxLength={50} 
          onChange={handleInput} 
          placeholder="Surname Lastname" 
          error={name.length > 0 && !validName()}
        />
      </label>
      <label>
        Email:<br />
        <Input 
          type="email" 
          name="email"
          value={email}
          minLength={6}
          onChange={handleInput} 
          placeholder="user@host"
          error={email.length > 0 && !validEmail()}
        />
      </label>
      <label >
        Password (at least 8 characters):<br />
        <Input 
          type="password" 
          name="password" 
          value={password}
          minLength={8}
          onChange={handleInput} 
          placeholder="password" 
          error={password.length > 0 && !validPass()}
        />
      </label>
      <label >
        Confirm Password:<br />
        <Input 
          type="password" 
          name="passwordConfirmation"
          value={passwordConfirmation}
          minLength={8}
          onChange={handleInput} 
          placeholder="password"
          error={passwordConfirmation.length > 0 && !validPassConf()}
        />
      </label>
      <Button disabled={!(validName() && validEmail() && validPass() && validPassConf())}>
        {authUser  ? 'Save changes' : 'Register'}
      </Button>
      {error && <span sx={{ color: 'error' }}>{error}</span>}
    </form>
  );
};

export default UserForm;