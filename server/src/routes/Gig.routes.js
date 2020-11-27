const GigController = require('../controllers/Gig.controller');
const Routes = require('../../config/Routes');
const { verifyToken, verifyUser } = require('../middlewares/auth');

const gigRoutes = app => {
  app.post(Routes.createGig, verifyToken, GigController.createGig);
  app.get(Routes.getGigs, verifyToken, GigController.getGigs);
  app.get(Routes.getGig, verifyToken, GigController.getGig);
  app.put(Routes.updateGig, verifyToken, GigController.updateGig);
  app.delete(Routes.deleteGig, verifyToken, GigController.deleteGig);
  app.get(Routes.getStats, verifyToken, GigController.getStats);
}

module.exports = gigRoutes;
