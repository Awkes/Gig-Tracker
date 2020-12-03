import { get, post, put, del } from './client';

type Gig = {
  _id: string,
  artist: string, 
  tour: string, 
  date: string, 
  venue: string, 
  city: string, 
  country: string,
  creator: string
}

type User = {
  id?: string,
  name: string,
  email: string,
  password: string
}

const auth = (email: string, password: string) => (
  post('auth', { body: JSON.stringify({ email, password }) })
);

const getUser = (userId: string, token: string) => (
  get(`user/${userId}`, { token })
);

const createUser = (body: User) => (
  post('user', { body: JSON.stringify(body) })
);

const updateUser = (body: User, token: string) => (
  put('user', { body: JSON.stringify(body), token })
);

// const deleteUser = () => {} DELETE /user

const getGigs = (userId: string, token: string, filters: object ) => {
  // const queryString = (Object.entries(filters) || []).map(
  //   ([key, val]: [string, string]) => key + '=' + val
  // ).join('&');
  const queryString = '';
  return get(`gigs/${userId}${queryString && '?' + queryString}`, { token });
}

const getGig = (gigId: string, token: string) => (
  get(`gig/${gigId}`, { token })
);

const createGig = (body: Gig, token: string) => (
  post('gig', { token, body: JSON.stringify(body) })
);

const updateGig = (body: Gig, token: string) => (
  put('gig', { token, body: JSON.stringify(body) })
);

const deleteGig = (_id: string, creator: string, token: string) => (
  del('gig', { token, body: JSON.stringify({ _id, creator }) })
);

const getStats = (userId: string, token: string) => get(`stats/${userId}`, { token });

export { 
  auth, 
  getUser, 
  createUser,
  updateUser,
  getGigs, 
  getGig, 
  createGig, 
  updateGig, 
  deleteGig, 
  getStats 
}
