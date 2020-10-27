/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment, useEffect, useState } from 'react';

import Box from '../../components/Box';
import HorizontalTable from '../../components/HorizontalTable';
import OrderedList from '../../components/OrderedList';
import Spinner from '../../components/Spinner';
import GigsVisitedOverTime from './GigsVisitedOverTime';
import { getStats } from '../../api';

const Stats = () => {
  const [status, setStatus] = useState('pending');
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    getStats().then(
      (data: any) => {
        if (data?.error) { 
          setStatus('error');
          setError(data.error);
        } 
        else {
          setStatus('resolved');
          setStats(data);
        }
      })
  }, []);

  if (status === 'pending') return <Spinner />;

  function formatValues(values: any[]) {
    return values?.map((value: any[]) => `${value[0]} (${value[1]})`)
  }

  return (
    <main sx={{
      flexGrow: 1,
      width: '100%',
      minWidth: 'minWidth',
      maxWidth: 'maxWidth',
      margin: '0 auto',
      paddingX: [3, null, 0],
      paddingY: 3,
      display: 'grid',
      gridTemplateColumns: ['1fr', '1fr 1fr'],
      gap: 3,
      fontFamily: 'text',
      letterSpacing: 1,
    }}>
      {status === 'error'
        ? <div sx={{ gridColumn: '1 / 3' }}>
            <Box error>{error}</Box>
          </div>
        : <Fragment>
            <div sx={{ gridColumn: [ null, '1 / 3'] }}>
              <Box>
                <h2 sx={{ margin: 0 }}>Statistics</h2>
              </Box>
            </div>
            <Box>
              <h3 sx={{ margin: 0, marginBottom: 3 }}>General</h3>
              <HorizontalTable values={[
                ['Total gigs:', stats?.totalGigs],
                ['Total artists:', stats?.totalArtists],
                ['Total venues:', stats?.totalVenues], 
                ['Total cities:', stats?.totalCities], 
                ['Total countries:', stats?.totalCountries]
              ]} />
            </Box>
            <Box>
              <h3 sx={{ margin: 0, marginBottom: 3 }}>Yearly visited gigs</h3>
              <HorizontalTable values={stats?.yearlyVisitedGigs?.map((val: any[]) => [val[0]+':', val[1]])} />
            </Box>
            <GigsVisitedOverTime 
              data={stats?.gigsVisitedOverTime?.map((gig: any[]) => gig[1])} 
              labels={stats?.gigsVisitedOverTime?.map((gig: any[]) => gig[0])}
            />
            <Box>
              <h3 sx={{ margin: 0, marginBottom: 3 }}>Most seen artists</h3>
              <OrderedList values={formatValues(stats?.mostSeenArtists)} />
            </Box>
            <Box>
              <h3 sx={{ margin: 0, marginBottom: 3 }}>Most visited venues</h3>
              <OrderedList values={formatValues(stats?.mostVisitedVenues)} />
            </Box>
            <Box>
              <h3 sx={{ margin: 0, marginBottom: 3 }}>Most visited cities</h3>
              <OrderedList values={formatValues(stats?.mostVisitedCities)} />
            </Box>
            <Box>
              <h3 sx={{ margin: 0, marginBottom: 3 }}>Most visited countries</h3>
              <OrderedList values={formatValues(stats?.mostVisitedCountries)} />
            </Box>
          </Fragment>
      }
    </main>
  );
}

export default Stats;