const { Schema }= require('mongoose');

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
});

module.exports = { UserSchema };