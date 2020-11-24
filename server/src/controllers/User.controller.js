const UserModel = require('../models/User.model');

const createUser = async (req, res) => {
  const { name, password, email } = req.body;
  const user = new UserModel({ name, password, email });

  try {
    const response = await user.save();
    res.status(201).send({
      message: 'User successfully created.',
      name: response.name,
      email: response.email,
    });
  } 
  catch(error) {
    res.status(500).send({
      message: 'Error while trying to create new user.',
      error: error.message
    });
  }
}

const getUsers = async (req, res) => {
  try {
    const response = await UserModel.find();
    const users = response.map(user => {
      const noPassUser = user.toObject();
      delete noPassUser.password;
      return noPassUser;
    });
    res.status(200).send(users);
  }
  catch(error) {
    res.status(500).send({
      message: 'Error while trying to get all users.',
      error: error.message
    })
  }
}

const getUser = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const response = await UserModel.findById(userId);
    const user = response.toObject();
    delete user.password;
    res.status(200).send(user);
  }
  catch(error) {
    res.status(500).send({
      message: `Error while trying to get user with id: ${userId}.`,
      error: error.message
    })
  }
}

const updateUser = async (req, res) => {
  const { name, password, email } = req.body;
  const { userId } = req.params;

  try {
    const response = await UserModel.findByIdAndUpdate(
      userId, { name, password, email }, { new: true, runValidators: true }
    );
    res.status(200).send({
      message: `User with id ${userId} successfully updated.`,
      name: response.name,
      email: response.email,
      password: response.password,
    });
  } 
  catch(error) {
    res.status(500).send({
      message: `Error while trying to update user with id: ${userId}.`,
      error: error.message
    });
  }
}

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const response = await UserModel.findByIdAndDelete(userId);
    if (response !== null) {
      res.status(200).send({
        message: `User with id ${userId} successfully deleted.`
      })
    } 
    else {
      throw new Error(`User with id: ${userId} doesn't exist.`)
    }
  }
  catch(error) {
    res.status(500).send({
      message: `Error while trying to delete user with id: ${userId}.`,
      error: error.message,
    })
  }
}

module.exports = { createUser, getUsers, getUser, updateUser, deleteUser };
