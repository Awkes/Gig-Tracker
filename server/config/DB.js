const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const DB_CONNECTION = process.env.DB_CONNECTION;

async function connect() {
  try {
    await mongoose.connect(DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('Successfully connected to database.')
  }
  catch(error) {
    console.error('Error while trying to connect to database: ' + error);
  }
}

module.exports.DB = { connect };
