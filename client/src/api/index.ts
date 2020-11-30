import { get, post, put, del } from './client';

const auth = (email: string, password: string) => (
  post('auth', { body: JSON.stringify({ email, password }) })
);

// const createUser = () => {} POST /user
// const getUser = () => {}    GET /user/:userId
// const updateUser = () => {} PUT /user
// const deleteUser = () => {} DELETE /user

// const getGig = () => {}     GET /gig/:gigId
// const updateGig = () => {}  PUT /gig
// const deleteGig = () => {}  DELETE /gig


// const getGigs = (userId: string) => client(`gigs/${userId}`);
// const getStats = (userId: string) => client(`stats/${userId}`);

const getGigs = () => get('fef89afd-a148-4e87-8653-0330b4493c1b');
const getStats = () => get('7ae75593-7a02-4c58-92aa-87fd102dc8f3');

export { auth, getGigs, getStats };