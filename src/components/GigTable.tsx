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
  setOrder: any
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

const GigTable = ({ gigs, setOrder }: Props) => {
  function changeOrder(e: MouseEvent) {
    const text = e?.currentTarget?.textContent?.toLowerCase();
    const order = text === 'location' ? 'venue' : text;

    setOrder(({ orderBy, asc }: { orderBy: string, asc: boolean }) => ({
      orderBy: order,
      asc: orderBy === order ? !asc : true,
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
            <td><Link to={`/gig/${id}`}>{date}</Link></td>
            <td><Link to={`/gig/${id}`}>{venue}, {city}, {country}</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default GigTable;