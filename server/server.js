const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const { DB, Server } = require('./config');

const app = express();
app.use(helmet());
app.use(morgan('common'));

app.get('/hello', (req, res) => {
  res.send('Hello!');
});

DB.connect();
Server.listen(app);
