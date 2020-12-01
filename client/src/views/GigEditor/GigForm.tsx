/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ChangeEvent, FormEvent, Fragment, MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';

import Box from '../../components/Box';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

type Props = {
  gig: {
    _id: number,
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
  handleDelete: (e: MouseEvent) => void,
  addTrack: () => void,
  delTrack: (e: MouseEvent<HTMLButtonElement>) => void,
  formIsValid: boolean,
}

const GigForm = ({ gig, handleInput, handleSubmit, handleDelete, addTrack, delTrack, formIsValid }: Props) => {
  const { artist, tour, date, venue, city, country, notes, setlist } = gig;

  return (
    <form onSubmit={handleSubmit} sx={{ display: 'grid', gap: 3 }}>
      <Box>
        <div sx={{
          display: 'grid',
          gap: 3,
          '&> label': {
            display: 'grid',
            gridTemplateColumns: '60px auto',
            gap: 3,
            alignItems: 'center',
            justifyItems: 'end'
          }
        }}>
          <h3 sx={{ margin: 0 }}>General Info</h3>
          <label sx={{ 
            position: 'relative',
            '&:after': { 
              content: '"*"',
              color: 'text',
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translate(10px, -25%)'
            }
          }}>
            Artist:
            <Input type="text" value={artist} name="artist" onChange={handleInput} />
          </label>
          <label>
            Tour:
            <Input type="text" value={tour} name="tour" onChange={handleInput} />
          </label>
          <label sx={{ 
            position: 'relative',
            '&:after': { 
              content: '"*"',
              color: 'text',
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translate(10px, -25%)'
            }
          }}>
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
        <div sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: 'auto 30px',
          alignItems: 'center',
        }}>
          <h3 sx={{ margin: 0 }}>Setlist</h3>
          <Button type="button" onClick={addTrack}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>        
          {setlist.map((track: string, i: number) => (
            <Fragment key={`setlist-${i}`}>
              <label sx={{
                display: 'grid',
                gridTemplateColumns: '60px auto',
                gap: 3,
                alignItems: 'center',
                justifyItems: 'end',
              }}>
                {i+1}:
                <Input type="text" value={track} name={`setlist-${i}`} onChange={handleInput} />
              </label>
              <Button danger type="button" data-index={i} onClick={delTrack}>
                <FontAwesomeIcon icon={faMinus} />
              </Button>
            </Fragment>
          ))}
        </div>
      </Box>

      <Box>
        <div sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
          <Button type="button" onClick={handleDelete} danger disabled={!gig._id}>
            <FontAwesomeIcon icon={faTrash} sx={{ marginBottom: '2px'}} />
            <span sx={{ marginLeft: 2 }}>Delete</span>
          </Button>
          <Button type="submit" disabled={!formIsValid}>
            <FontAwesomeIcon icon={faSave} sx={{ marginBottom: '2px'}} />
            <span sx={{ marginLeft: 2 }}>Save</span>
          </Button>
        </div>
      </Box>
    </form>
  );
}

export default GigForm;
