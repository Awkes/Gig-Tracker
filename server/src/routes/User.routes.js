const UserController = require('../controllers/User.controller');
const Routes = require('../../config/Routes');
const { verifyToken, verifyUser } = require('../middlewares/auth');

const userRoutes = app => {
  app.post(Routes.createUser, UserController.createUser);
  app.get(Routes.getUsers, verifyToken, UserController.getUsers);
  app.get(Routes.getUser, verifyToken, UserController.getUser);
  app.put(Routes.updateUser, verifyToken, UserController.updateUser);
  app.delete(Routes.deleteUser, verifyToken, UserController.deleteUser);
  app.post(Routes.signIn, UserController.signIn);
}

module.exports = userRoutes;
