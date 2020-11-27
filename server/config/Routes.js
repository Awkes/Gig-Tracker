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
  updateGig:    '/gig/:gigId',
  deleteGig:    '/gig/:gigId',

  getStats:     '/stats/:userId',
}
