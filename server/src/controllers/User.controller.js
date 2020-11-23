const UserModel = require('../models/User.model');

const createUser = async (req, res) => {
  const { name, password, email } = req.body;
  const user = new UserModel({ name, password, email });

  try {
    const response = await user.save();
    res.status(201).send({
      message: `User successfully created.`,
      name: response.name,
      email: response.email,
    });
  } 
  catch(error) {
    res.status(500).send({
      message: 'Error, while trying to create new user.',
      error: error.message
    });
  }
}

module.exports = { createUser };
