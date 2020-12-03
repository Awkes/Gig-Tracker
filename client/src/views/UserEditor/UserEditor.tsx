/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import UserForm from './UserForm';
import Box from '../../components/Box';

import Spinner from '../../components/Spinner';
import penguinadmin from '../../assets/images/penguinadmin.svg';
import useAuth from '../../hooks/useAuth';
import routes from '../../config/routes';
import { getUser, updateUser, createUser } from '../../api';

const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserEditor = () => {
  const { authUser } = useAuth();
  const { pathname } = useLocation();
  const history = useHistory();
  
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState<boolean>(pathname !== routes.registerPath);
  
  const validName = () => name.length > 3 && name.length < 50;
  const validEmail = () => !!email.match(emailRegexp);
  const validPass = () => password.length > 7;
  const validPassConf = () => password === passwordConfirmation;

  function handleInput(e: ChangeEvent) {
    const { name: input, value } = e.currentTarget as HTMLInputElement;

    if (input === 'name') setName(value);
    else if (input === 'email') setEmail(value);
    else if (input === 'password') setPassword(value);
    else if (input === 'passwordConfirmation') setPasswordConfirmation(value);
  }

  async function handleSubmit(e: FormEvent): Promise<any> {
    e.preventDefault();
    if (validName && validEmail && validPass && validPassConf) { 
      setLoading(true);
      try {
        if (authUser) {
          await updateUser({ name, email, password, id: authUser.id }, authUser.token)
          alert('User profile updated!');
          setPassword('');
          setPasswordConfirmation('');
          setLoading(false);
        }
        else {
          await createUser({ name, email, password });
          alert(`User ${email} successfully created. You can now sign in.`);
          history.push(routes.homePath);
        }
      }
      catch(error) { setError(error.message) }
    }
  }

  useEffect(() => {
    if (authUser && pathname === routes.userPath) {
      (async function() {
        try {
          const user = await getUser(authUser.id, authUser.token);
          setName(user.name);
          setEmail(user.email);
        }
        catch(error) { setError(error.message) }
        setLoading(false);
      })();
    }
  }, [authUser, pathname]);

  return (loading 
    ? <Spinner />
    : <main sx={{
        flexGrow: 1,
        width: '100%',
        minWidth: 'minWidth',
        maxWidth: ['100%', 'maxWidth'],
        margin: '0 auto',
        paddingX: [3, null, 0],
        paddingY: 3,
        display: 'grid',
        gap: 3,
        fontFamily: 'text',
        letterSpacing: 1,
      }}>
        <Box>
          <h2 sx={{ margin: 0, justifySelf: 'start' }}>
            {authUser && pathname === routes.userPath 
              ? 'Edit user profile' 
              : 'User registration'
            }
          </h2>
        </Box>
        {authUser && pathname === routes.registerPath
          ? <Box error>To register a new user you must sign out.</Box>
          : <Box>
              <section sx={{
                display: 'grid',
                gridTemplateColumns: ['1fr', '1fr 1fr'],
                gap: 4,
                alignItems: 'center',
              }}>
                <UserForm {...{ 
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
                }} />
                <img 
                  src={penguinadmin} 
                  alt="Penguin signing up on GigTracker" 
                  sx={{ 
                    width: '100%', 
                    maxWidth: '100%',
                  }} 
                />
              </section>
            </Box>
        }
      </main>
    );
};

export default UserEditor;
