/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ChangeEvent, FormEvent, Fragment, MouseEvent, useEffect, useReducer } from 'react';
import { Prompt, useParams } from 'react-router-dom';

import { getGig } from '../../api';
import Box from '../../components/Box';
import Spinner from '../../components/Spinner';
import GigForm from './GigForm';
import { reducer, initialState } from './reducer';

const GigEditor = () => {
  const { id } = useParams<any>();
  const [state, dispatch] = useReducer(
    reducer, { ...initialState, status: !id ? 'new' : 'pending'}
  );

  useEffect(() => {
    if (id) {
      getGig(id).then(
        (data: any) => {
          if (data?.error) {
            dispatch({ type: 'ERROR', payload: data.error })
          }
          else {
            data
              ? dispatch({ type: 'SET_GIG', payload: data })
              : dispatch({ type: 'ERROR', payload: `Can't find gig with id: ${id}` })
          }
        })
    }
  }, [id]);

  function handleInput(e: ChangeEvent) {
    const { name, value }: any = e.target;
    if (name.split('-')[0] === 'setlist') {
      dispatch({ type: 'UPDATE_SETLIST', payload: [Number(name.split('-')[1]), value]})
    }
    else {
      dispatch({ type: 'UPDATE_GIG', payload: { [name]: value }})
    }
  }

  function handleSubmit(e: FormEvent): void {
    // To be implemented
    e.preventDefault();
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
