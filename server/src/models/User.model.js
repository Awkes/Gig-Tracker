const { model, models, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  name: { 
    type: String, 
    minlength: [4, 'Name must be at least 4 characters.'],
    maxlength: [50, 'Name cannot be longer than 50 characters.'],
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
  if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Hash password before updating
UserSchema.pre('findOneAndUpdate', async function(next) {
  const { password } = this._update;
  const { _id } = this.getFilter();
  
  if (password) {
    const passwordHasChanged = await (async function() {
      const user = await models['User'].findById(_id);
      if (!user) throw new Error('No user found!');
      const { password: oldPassword } = user;  
      return !bcrypt.compareSync(password, oldPassword)
    })();
    
    if (passwordHasChanged) this._update.password = await bcrypt.hash(password, 10);
    else delete this._update.password
  } 

  next();
})

const UserModel = model('User', UserSchema);

module.exports = UserModel;
