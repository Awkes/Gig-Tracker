/** @jsx jsx */
import { jsx } from 'theme-ui';

import Box from '../../components/Box';
import HorizontalTable from '../../components/HorizontalTable';
import OrderedList from '../../components/OrderedList';
import GigsVisitedOverTime from './GigsVisitedOverTime';

import { gigs } from '../../api/mock-data.json';
const totalGigs: number = gigs.length;
const totalArtists: number = Array.from(new Set(gigs.map(({ artist }) => artist))).length;
const totalVenues: number = Array.from(new Set(gigs.map(({ venue }) => venue))).length;
const totalCities: number = Array.from(new Set(gigs.map(({ city }) => city))).length;
const totalCountries: number = Array.from(new Set(gigs.map(({ city }) => city))).length;
const mostSeenArtists: string[] = ['Wednesday 13 (30)', 'Crashdïet (17)',  'Pearl Jam (11)', 'Guns N Roses (7)', 'Mötley Crüe (3)'];
const mostVisitedVenues: string[] = ['Pub Anchor (20)', 'Harry B James (17)', 'Globen (15)', 'Arenan (10)', 'Ullevi (3)'];
const mostVisitedCities: string[] = ['Stockholm (88)', 'Los Angeles (12)', 'London (8)', 'Amsterdam (4)', 'Gothenburg (3)'];
const mostVisitedCountries: string[] = ['Sweden (99)', 'United States (15)', 'United Kingdom (8)', 'Netherlands (4)', 'Czech Republic (3)'];

const Stats = () => {
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
      <div sx={{ gridColumn: [ null, '1 / 3'] }}>
        <Box>
          <h2 sx={{ margin: 0 }}>Statistics</h2>
        </Box>
      </div>
      
      <Box>
        <h3 sx={{ margin: 0, marginBottom: 3 }}>General</h3>
        <HorizontalTable values={[
          ['Total gigs:', totalGigs],
          ['Total artists:', totalArtists],
          ['Total venues:', totalVenues], 
          ['Total cities:', totalCities], 
          ['Total countries:', totalCountries]
        ]} />
      </Box>
      
      <Box>
        <h3 sx={{ margin: 0, marginBottom: 3 }}>Yearly visited gigs</h3>
        <HorizontalTable values={[
          ['2020:', 4],
          ['2019:', 102],
          ['2018:', 99], 
          ['2017:', 150], 
          ['2016:', 53]
        ]} />
      </Box>

      <GigsVisitedOverTime 
        data={[12, 3, 0, 20, 10, 13]} 
        labels={['May 20', 'Jun 20', 'Jul 20', 'Aug 20', 'Sep 20', 'Oct 20']} 
      />
      
      <Box>
        <h3 sx={{ margin: 0 }}>Most seen artists</h3>
        <OrderedList values={mostSeenArtists} />
      </Box>
      
      <Box>
        <h3 sx={{ margin: 0 }}>Most visited venues</h3>
        <OrderedList values={mostVisitedVenues} />
      </Box>
      
      <Box>
        <h3 sx={{ margin: 0 }}>Most visited cities</h3>
        <OrderedList values={mostVisitedCities} />
      </Box>
      
      <Box>
        <h3 sx={{ margin: 0 }}>Most visited countries</h3>
        <OrderedList values={mostVisitedCountries} />
      </Box>
      
    </main>
  );
}

export default Stats;