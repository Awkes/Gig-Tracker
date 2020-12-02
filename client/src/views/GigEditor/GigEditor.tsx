/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ChangeEvent, FormEvent, Fragment, MouseEvent, useEffect, useMemo, useReducer } from 'react';
import { Prompt, useParams, useHistory } from 'react-router-dom';

import Box from '../../components/Box';
import Spinner from '../../components/Spinner';
import GigForm from './GigForm';
import { reducer, initialState } from './reducer';
import useAuth from '../../hooks/useAuth';
import routes from '../../config/routes';

import { getGig, createGig, updateGig } from '../../api';

const GigEditor = () => {
  const { id } = useParams<any>();
  const [state, dispatch] = useReducer(
    reducer, { ...initialState, status: !id ? 'new' : 'pending'}
  );
  
  const { authUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (id) {
      (async function() {
        try {
          const gig = await getGig(id, authUser.token);
          gig
            ? dispatch({ type: 'SET_GIG', payload: gig })
            : dispatch({ type: 'ERROR', payload: `Can't find gig with id: ${id}` })
        }
        catch(error) {
          dispatch({ type: 'ERROR', payload: error.message })
        }
      })();
    }
  }, [id, authUser.token]);

  const formIsValid = useMemo(() => {
    const { artist, date } = state.gig;
    const d: Date = new Date(date);
    return artist.length > 0 && date.length >= 10 && d instanceof Date
  }, [state.gig]);

  function handleInput(e: ChangeEvent) {
    const { name, value }: any = e.target;
    if (name.split('-')[0] === 'setlist') {
      dispatch({ type: 'UPDATE_SETLIST', payload: [Number(name.split('-')[1]), value]})
    }
    else {
      dispatch({ type: 'UPDATE_GIG', payload: { [name]: value }})
    }
  }

  async function handleSubmit(e: FormEvent): Promise<any> {
    e.preventDefault();
    dispatch({ type: 'STATUS_CHANGE', payload: 'submit' });
    if (formIsValid) { 
      try {
        const gig = id 
          ? await updateGig({ ...state.gig, creator: authUser.id }, authUser.token)
          : await createGig({ ...state.gig, creator: authUser.id }, authUser.token);
        history.push(`${routes.gigPath}/${gig._id}`);
      }
      catch(error) {
        dispatch({ type: 'ERROR', payload: error.message })
      }
    }
  }

  function handleDelete(e: MouseEvent): void {
    // To be implemented
    window.confirm('Are your sure you want to delete this gig?');
  }

  function addTrack() {
    dispatch({ type: 'ADD_SETLIST_TRACK' })
  }
  
  function delTrack(e: MouseEvent<HTMLButtonElement>): void {
    const { index } = e.currentTarget.dataset;
    dispatch({ type: 'DEL_SETLIST_TRACK', payload: index })
  }
  
  if (state.status === 'pending') return <Spinner />;

  return (
    <main sx={{
      flexGrow: 1,
      width: '100%',
      minWidth: 'minWidth',
      maxWidth: ['100%', 'maxWidth'],
      margin: '0 auto',
      paddingX: [3, null, 0],
      paddingY: 3,
      fontFamily: 'text',
      letterSpacing: 1,
      display: 'grid',
      gap: 3,
    }}>
      {state.status === 'error' 
        ? <Box error>{state.error}</Box>
        : <Fragment>
            <Box>
              <h2 sx={{ margin: 0, justifySelf: 'start' }}>
                {id ? 'Edit' : 'New'} Gig
              </h2>
            </Box>
            <GigForm 
              gig={state.gig}
              addTrack={addTrack}
              delTrack={delTrack}
              handleDelete={handleDelete}
              handleInput={handleInput}
              handleSubmit={handleSubmit}
              formIsValid={formIsValid}
            />
          </Fragment>
      }
      <Prompt
        when={state.status === 'edited'} 
        message="Are you sure you want to leave the current page? All unsaved data will be lost."
      />
    </main>
  );
}

export default GigEditor;
