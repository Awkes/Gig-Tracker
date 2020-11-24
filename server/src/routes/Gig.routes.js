const GigController = require('../controllers/Gig.controller');
const Routes = require('../../config/Routes');

const gigRoutes = app => {
  app.post(Routes.createGig, GigController.createGig);
}

module.exports = gigRoutes;
