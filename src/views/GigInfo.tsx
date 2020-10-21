/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import Box from '../components/Box';

import { gigs } from '../api/mock-data.json';

const GigInfo = () => {
  const { id } = useParams<any>();
  const gig: any = useMemo(() => gigs.find((gig: any) => gig.id === Number(id)), [id]);

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
      {!gig
        ? <Box error>
            Can't find gig with id: <b>{id}</b>.
          </Box>
        : <Fragment>
            <Box>
              <div sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'auto 32px',
                alignItems: 'center',
                justifyItems: 'center',
              }}>
                <h2 sx={{ margin: 0, justifySelf: 'start' }}>{gig.artist}</h2>
                <Link to={`/edit-gig/${id}`}>
                  <FontAwesomeIcon icon={faEdit} sx={{ color: 'text'}} />
                </Link>
              </div>
            </Box>

            <Box>
              <dl sx={{
                margin: 0,
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: 3,
                '&>dt': { fontWeight: 'bold' },
                '&>dd': { margin: 0 }
              }}>
                <dt>Artist:</dt>
                <dd>{gig.artist}</dd>

                <dt>Tour:</dt>
                <dd>{gig.tour}</dd>

                <dt>Date:</dt>
                <dd>{gig.date}</dd>

                <dt>Venue:</dt>
                <dd>{gig.venue}</dd>

                <dt>City:</dt>
                <dd>{gig.city}</dd>

                <dt>Country:</dt>
                <dd>{gig.country}</dd>          
              </dl>
            </Box>

            <Box>
              <h3 sx={{ margin: 0 }}>Notes</h3>
              <div sx={{ marginTop: 3 }}>
                {gig.notes}
              </div>
            </Box>

            <Box>
              <h3 sx={{ margin: 0 }}>
                Setlist
              </h3>
              <ol sx={{ 
                margin: 0,
                marginTop: 3, 
              }}>
                {gig.setlist.map((song: string, i: number) => (
                  <li key={`song+${i}`}>
                    {song}
                  </li>
                ))}
              </ol>
            </Box>
          </Fragment>
      }
    </main>
  );
}

export default GigInfo;
