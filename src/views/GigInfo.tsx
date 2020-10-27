/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import Box from '../components/Box';
import HorizontalTable from '../components/HorizontalTable';
import OrderedList from '../components/OrderedList';
import Spinner from '../components/Spinner';
import { getGig } from '../api';

const GigInfo = () => {
  const { id } = useParams<any>();
  const [status, setStatus] = useState('pending');
  const [gig, setGig] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    getGig(id).then(
      (data: any) => {
        if (data?.error) { 
          setStatus('error');
          setError(data.error);
        } 
        else {
          setStatus('resolved');
          data ? setGig(data) : setError(`Can't find gig with id: ${id}`);
        }
      })
  }, [id]);

  if (status === 'pending') return <Spinner />;

  return (
    <main sx={{
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
      {error
        ? <Box error>{error}</Box>
        : <Fragment>
            <Box>
              <div sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'auto 32px',
                alignItems: 'center',
                justifyItems: 'center',
              }}>
                <h2 sx={{ margin: 0, justifySelf: 'start' }}>{gig?.artist}</h2>
                <Link to={`/edit-gig/${id}`}>
                  <FontAwesomeIcon icon={faEdit} sx={{ color: 'text'}} />
                </Link>
              </div>
            </Box>

            <Box>
              <HorizontalTable values={[
                ['Artist:', gig?.artist],
                ['Tour:', gig?.tour],
                ['Date:', gig?.date],
                ['Venue:', gig?.venue],
                ['City:', gig?.city],
                ['Country:', gig?.country],
              ]} />
            </Box>

            <Box>
              <h3 sx={{ margin: 0 }}>Notes</h3>
              <div sx={{ marginTop: 3 }}>
                {gig?.notes}
              </div>
            </Box>

            <Box>
              <h3 sx={{ margin: 0, marginBottom: 3 }}>Setlist</h3>
              <OrderedList values={gig?.setlist || []} />
            </Box>
          </Fragment>
      }
    </main>
  );
}

export default GigInfo;
