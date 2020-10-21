export const initialState = {
  gig: {
    artist: '',
    tour: '',
    date: '',
    venue: '',
    city: '',
    country: '',
    notes: '',
    setlist: [],
  },
  status: 'initiate'
}

export function reducer(state: any, { type, payload }: any) {
  switch (type) {
    case 'SET_GIG':
      return {
        ...state,
        gig: { ...payload },
        status: 'resolved',
      }
    case 'UPDATE_GIG':
      return {
        ...state,
        gig: {
          ...state.gig,
          ...payload,
        },
        status: 'edited'
      }
    case 'UPDATE_SETLIST':
      const setlist = [...state.gig.setlist];
      setlist[payload[0]] = payload[1];
      return {
        ...state,
        gig: {
          ...state.gig,
          setlist
        },
        status: 'edited'
      }
    case 'STATUS_CHANGE':
      return {
        ...state,
        status: payload
      }
    case 'ERROR':
      return {
        ...state,
        error: payload,
        status: 'error',
      }
  }
}