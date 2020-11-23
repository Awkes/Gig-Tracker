const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  name: { 
    type: String, 
    minlength: [4, 'Name must be at least 4 characters.'],
    maxlength: [20, 'Name cannot be longer than 20 characters.'],
    required: [true, 'Name is required.'],
  },
  password: {
    type: String,
    minlength: [8, 'Password must be at least 8 characters.'],
    required: [true, 'Password is required.'],
  },
  email: {
    type: String,
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'E-mail address must be valid.'],
    required: [true, 'E-mail is required.'],
    unique: true
  }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) user.password = await bcrypt.hash(user.password, 10);
  next();
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;
