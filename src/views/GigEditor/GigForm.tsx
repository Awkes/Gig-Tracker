/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ChangeEvent, FormEvent, MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';

import Box from '../../components/Box';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

type Props = {
  gig: {
    id: number,
    artist: string, 
    tour: string, 
    date: string, 
    venue: string, 
    city: string, 
    country: string,
    notes: string,
    setlist: string[]
  },
  handleInput: (e: ChangeEvent) => void,
  handleSubmit: (e: FormEvent) => void,
  handleDelete: (e: MouseEvent) => void;
}

const gridStyle = {
  display: 'grid',
  gap: 3,
  '&> label': {
    display: 'grid',
    gridTemplateColumns: '60px auto',
    gap: 3,
    alignItems: 'center',
    justifyItems: 'end',
  },
}

const GigForm = ({ gig, handleInput, handleSubmit, handleDelete }: Props) => {
  const { artist, tour, date, venue, city, country, notes, setlist } = gig;
  return (
    <form onSubmit={handleSubmit} sx={{ display: 'grid', gap: 3 }}>
      <Box>
        <div sx={gridStyle}>
          <h3 sx={{ margin: 0 }}>General Info</h3>
          <label>
            Artist:
            <Input type="text" value={artist} name="artist" onChange={handleInput} />
          </label>
          <label>
            Tour:
            <Input type="text" value={tour} name="tour" onChange={handleInput} />
          </label>
          <label>
            Date:
            <Input type="date" value={date} name="date" onChange={handleInput} />
          </label>
          <label>
            Venue:
            <Input type="text" value={venue} name="venue" onChange={handleInput} />
          </label>
          <label>
            City:
            <Input type="text" value={city} name="city" onChange={handleInput} />
          </label>
          <label>
            Country:
            <Input type="text" value={country} name="country" onChange={handleInput} />
          </label>              
          <label>
            Notes:
            <Textarea 
              name="notes" 
              sx={{ height: '200px', resize: 'none' }}
              value={notes}
              onChange={handleInput}
            />
          </label>
        </div>
      </Box>

      <Box>
        <div sx={gridStyle}>
          <h3 sx={{ margin: 0 }}>Setlist</h3>
          {setlist.map((track: string, i: number) => (
            <label key={`setlist-${i}`}>
              {i+1}:
              <Input type="text" value={track} name={`setlist-${i}`} onChange={handleInput} />
            </label>
          ))}
        </div>
      </Box>

      <Box>
        <div sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
          <Button type="button" onClick={handleDelete} danger>
            <FontAwesomeIcon icon={faTrash} />
            <span sx={{ marginLeft: 2 }}>Delete</span>
          </Button>
          <Button type="submit">
            <FontAwesomeIcon icon={faSave} />
            <span sx={{ marginLeft: 2 }}>Save</span>
          </Button>
        </div>
      </Box>
    </form>
  );
}

export default GigForm;