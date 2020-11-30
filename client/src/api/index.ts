import { get, post, put, del } from './client';

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
  return get(`gigs/${userId}${queryString && '?' + queryString}`, {
    headers: { 'x-access-token': token }
  });
}

// const getGig = () => {}     GET /gig/:gigId
// const updateGig = () => {}  PUT /gig
// const deleteGig = () => {}  DELETE /gig

const getStats = (userId: string, token: string) => get(`stats/${userId}`, {
  headers: { 'x-access-token': token }
});

export { auth, getGigs, getStats }
