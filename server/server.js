const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const { DB, Server } = require('./config');
const userRoutes = require('./src/routes/User.routes');

const app = express();
app.use(helmet());
app.use(morgan('common'));
app.use(express.json());

app.get('/hello', (req, res) => {
  res.send('Hello!');
});

userRoutes(app);

DB.connect();
Server.listen(app);
