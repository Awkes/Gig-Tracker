const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');

const { DB, Server } = require('./config');
const userRoutes = require('./src/routes/User.routes');
const gigRoutes = require('./src/routes/Gig.routes');

const app = express();
app.use(helmet());
app.use(morgan('common'));
app.use(express.json());

userRoutes(app);
gigRoutes(app);

DB.connect();

dotenv.config();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build/'));
  app.get('*', (req, res) => res.sendFile(
    path.resolve(__dirname, 'client', 'build', 'index.html')
  ));
}

Server.listen(app);

module.exports = app;
