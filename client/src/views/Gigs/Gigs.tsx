/** @jsx jsx */
import { jsx } from 'theme-ui';
import { FormEvent, Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import Box from '../../components/Box';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';
import GigTable from './GigTable';
import useAuth from '../../hooks/useAuth';

import { getGigs } from '../../api'

const Gigs = () => {
  const [status, setStatus] = useState<string>('pending');
  const [error, setError] = useState<string|null>(null);
  const [gigs, setGigs] = useState([]);
  const [filter, setFilter] = useState<any>({ order: 'date', sort: 'desc', search: '' });
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  
  const { authUser } = useAuth();

  useEffect(() => {
    (async function() {
      try {
        const gigs = await getGigs(authUser.id, authUser.token, { ...filter, limit });
        const { results, totalGigs } = gigs;
        setStatus('resolved');
        setGigs(results);
        setTotal(totalGigs);
        setLimit(limit => limit < totalGigs ? limit : totalGigs);
      }
      catch(error) {
        setStatus('error');
        setError(error.message)
      }
    })();
  }, [filter, limit, authUser.id, authUser.token])

  function searchGigs(e: FormEvent): void {
    const { value: search } = e.currentTarget as HTMLInputElement;
    setFilter((filter: { order: string, sort: string, search: string }) => (
      { ...filter, search }
    ));
  }

  function loadMore() {
    setLimit(state => state + 10);
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
                <Input type="text" name="filter" onChange={searchGigs} />
              </div>
            </Box>
            <Box noPadding>
              <GigTable gigs={gigs} setFilter={setFilter} />
            </Box>
            <Box>
              <Button onClick={loadMore} disabled={limit >= total}>Load more</Button>
            </Box>
          </Fragment>
      }    
    </main>
  );
}

export default Gigs;