const GigController = require('../controllers/Gig.controller');
const Routes = require('../../config/Routes');

const gigRoutes = app => {
  app.post(Routes.createGig, GigController.createGig);
  app.get(Routes.getGigs, GigController.getGigs);
  app.get(Routes.getGig, GigController.getGig);
}

module.exports = gigRoutes;
