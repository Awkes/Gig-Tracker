const UserController = require('../controllers/User.controller');
const Routes = require('../../config/Routes');

const userRoutes = app => {
  app.post(Routes.createUser, UserController.createUser);
  // app.get(Routes.getUser, UserController.getUser);
  // app.put(Routes.updateUser, UserController.updateUser);
  // app.delete(Routes.deleteUser, UserController.deleteUser);
}

module.exports = userRoutes;
