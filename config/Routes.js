module.exports = {
  createUser:   '/user',
  getUsers:     '/users',
  getUser:      '/user/:userId',
  updateUser:   '/user',
  deleteUser:   '/user',
  signIn:       '/auth',

  createGig:    '/gig',
  getGigs:      '/gigs/:userId',
  getGig:       '/gig/:gigId',
  updateGig:    '/gig',
  deleteGig:    '/gig',

  getStats:     '/stats/:userId',
}
