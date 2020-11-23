/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import Box from '../../components/Box';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';
import GigTable from './GigTable';

import { getGigs } from '../../api'

const Gigs = () => {
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState<string|null>(null);
  const [gigs, setGigs] = useState([]);
  const [order, setOrder] = useState({ orderBy: 'artist', asc: true });
  const [total, setTotal] = useState(10)

  useEffect(() => {
    (async function() {
      try {
        const { gigs } = await getGigs();
        setStatus('resolved');
        setGigs(gigs);
      }
      catch {
        setStatus('error');
        setError('Something went wrong, please try again!')
      }
    })();
  }, [])

  // Temporary sorting, better sorting will be implemented with backend
  useEffect(() => {
    const { orderBy, asc } = order;
    setGigs(gigs => ( 
      gigs.sort((a: any, b: any) => a[orderBy] > b[orderBy] 
        ? (asc ? 1 : -1) 
        : (asc ? -1 : 1)
    )));
  }, [order]);

  // Temporary loading, real functionality to be implemented with backend
  function loadMore() {
    setTotal(state => state + 10);
  }

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
      {status === 'error' 
        ? <Box error>{error}</Box>
        : <Fragment>
            <Box>
              <div sx={{ 
                display: 'grid', 
                gridTemplateColumns: ['auto 32px 50%', 'auto 32px 30%'],
                alignItems: 'center',
                justifyItems: 'center',
              }}>
                <h2 sx={{ margin: 0, justifySelf: 'start' }}>Gigs</h2>
                <FontAwesomeIcon icon={faFilter} sx={{ color: 'secondary'}} />
                <Input type="text" name="filter" />
              </div>
            </Box>
            <Box noPadding>
              <GigTable gigs={gigs.slice(0, total)} setOrder={setOrder} />
            </Box>
            <Box>
              <Button onClick={loadMore} disabled={total >= gigs.length}>Load more</Button>
            </Box>
          </Fragment>
      }    
    </main>
  );
}

export default Gigs;