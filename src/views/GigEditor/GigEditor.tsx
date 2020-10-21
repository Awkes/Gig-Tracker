/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useReducer } from 'react';
import { Prompt, useParams } from 'react-router-dom';

import Box from '../../components/Box';
import GigForm from './GigForm';
import { reducer, initialState } from './reducer';

import { gigs } from '../../api/mock-data.json';

const GigEditor = () => {
  const { id } = useParams<any>();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (id) {
      dispatch({ type: 'STATUS_CHANGE', payload: 'pending' });
      const gig = gigs.find((gig: any) => gig.id === Number(id));
      if (gig) {
        dispatch({ type: 'SET_GIG', payload: gig });
      }
      else {
        dispatch({ type: 'ERROR', payload: `Can't find gig with id: ${id}` });
      }
    }
    else {
      dispatch({ type: 'STATUS_CHANGE', payload: 'new'});
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
      <Box>
        <h2 sx={{ margin: 0, justifySelf: 'start' }}>
          {id ? 'Edit' : 'New'} Gig
        </h2>
      </Box>
      {state.error 
        ? <Box error>{state.error}</Box>
        : <GigForm gig={state.gig} {...{ handleInput, handleSubmit, handleDelete }} />
      }
      <Prompt
        when={state.status === 'edited'} 
        message="Are you sure you want to leave the current page? All unsaved data will be lost."
      />
    </main>
  );
}

export default GigEditor;
