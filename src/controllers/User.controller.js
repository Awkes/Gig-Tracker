const UserModel = require('../models/User.model');
const { secret } = require('../../config/auth');
const verifyUser = require('../utils/verifyUser');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
    const users = response.map(({ id, name, email }) => ({ id, name, email }));
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

  if (verifyUser(userId, req, res)) {
    try {
      const response = await UserModel.findById(userId);
      const { id, name, email } = response;
      
      res.status(200).send({ id, name, email });
    }
    catch(error) {
      res.status(500).send({
        message: `Error while trying to get user with id: ${userId}.`,
        error: error.message
      })
    }
  }
}

const updateUser = async (req, res) => {
  const { id } = req.body;

  if (verifyUser(id, req, res)) {
    try {
      const user = await UserModel.findById(id);
      Object.keys(req.body).forEach(key => user[key] = req.body[key]);   
      user.save();       
      res.status(200).send({
        message: `User with id ${id} successfully updated.`,
        name: user.name,
        email: user.email,
      });
    } 
    catch(error) {
      res.status(500).send({
        message: `Error while trying to update user with id: ${id}.`,
        error: error.message
      });
    }
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.body;

  if (verifyUser(id, req, res)) {
    try {
      const user = await UserModel.findByIdAndDelete(id);
      if (!user) throw new Error(`User with id: ${id} doesn't exist.`);
      res.status(200).send({ message: `User with id ${id} successfully deleted.` });
    }
    catch(error) {
      res.status(500).send({
        message: `Error while trying to delete user with id: ${id}.`,
        error: error.message,
      })
    }
  }
}

const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(500).send({ message: 'Provide both email and password.' });

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).send({ message: `User ${email} is not found.`});
    
    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) return res.status(401).send({ 
      message: `Provided password for ${email} is incorrect.`,
      accessToken: null,
    });

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 });
    res.status(200).send({ id: user.id, name: user.name, email: user.email, token });
  }
  catch(error) {
    res.status(500).send({
      message: `Error while trying to sign in ${email}.`,
      error: error.message,
    })
  }
}

module.exports = { createUser, getUsers, getUser, updateUser, deleteUser, signIn };
