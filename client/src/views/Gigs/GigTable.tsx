/** @jsx jsx */
import { MouseEvent } from 'react';
import { jsx } from 'theme-ui';
import { Link } from 'react-router-dom';

type Props = {
  gigs: { 
    id: number,
    artist: string, 
    tour: string, 
    date: string, 
    venue: string, 
    city: string, 
    country: string
  }[],
  setFilter: any
}

const trStyle = {
  display: ['grid', 'table-row'],
  width: '100%',
  columnGap: [3, null],
  padding: [3, null],
  '&>th, &>td>a': { padding: [0, 3] },
  '&>td>a': {
    display: 'block',
    color: 'text',
    textDecoration: 'none',
  },
  '&>th': { 
    cursor: 'pointer',
    '&:hover': { textDecoration: 'underline' }
  },
}

const GigTable = ({ gigs, setFilter }: Props) => {
  function changeOrder(e: MouseEvent) {
    const text = e?.currentTarget?.textContent?.toLowerCase();
    const newOrder = text === 'location' ? 'venue' : text;

    setFilter((filter: { order: string, sort: string, filter: string}) => ({
      ...filter,
      order: newOrder,
      sort: filter.sort === 'asc' ? 'desc' : 'asc',
    }))
  }

  return (
    <table sx={{ 
      width: '100%', 
      borderCollapse: 'collapse', 
      textAlign: 'left'
    }}>
      <thead>
        <tr sx={trStyle}>
          <th onClick={changeOrder}>Artist</th>
          <th onClick={changeOrder}>Tour</th>
          <th onClick={changeOrder}>Date</th>
          <th onClick={changeOrder}>Location</th>
        </tr>
      </thead>
      <tbody>
        {gigs.map(({ id, artist, tour, date, venue, city, country }, i) => (
          <tr 
            key={id}
            sx={{ 
              ...trStyle,
              backgroundColor: i % 2 === 0 ? 'quarternary' : null,
              '&:hover': { backgroundColor: 'secondary' }
          }}
          >
            <td><Link to={`/gig/${id}`}>{artist}</Link></td>
            <td><Link to={`/gig/${id}`}>{tour}</Link></td>
            <td><Link to={`/gig/${id}`}>{date.substring(0,10)}</Link></td>
            <td><Link to={`/gig/${id}`}>{[venue, city, country].filter(val => val).join(', ')}</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default GigTable;