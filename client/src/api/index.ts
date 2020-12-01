import { get, post, put, del } from './client';

type Gig = {
  artist: string, 
  tour: string, 
  date: string, 
  venue: string, 
  city: string, 
  country: string,
  creator: string
}

const auth = (email: string, password: string) => (
  post('auth', { body: JSON.stringify({ email, password }) })
);

// const createUser = () => {} POST /user
// const getUser = () => {}    GET /user/:userId
// const updateUser = () => {} PUT /user
// const deleteUser = () => {} DELETE /user

const getGigs = (userId: string, token: string, filters: object = {}) => {
  const queryString = Object.entries(filters).map(
    ([key, val]: [string, string]) => key + '=' + val
  ).join('&');
  return get(`gigs/${userId}${queryString && '?' + queryString}`, { token });
}

const getGig = (gigId: string, token: string) => (
  get(`gig/${gigId}`, { token })
);

const createGig = (body: Gig, token: string) => (
  post('gig', { token, body: JSON.stringify(body) })
);

// const updateGig = () => {}  PUT /gig
// const deleteGig = () => {}  DELETE /gig

const getStats = (userId: string, token: string) => get(`stats/${userId}`, { token });

export { auth, getGigs, getGig, createGig, getStats }
