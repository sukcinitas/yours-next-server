const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Method', 'GET, POST, PUT, PATCH, POST, DELETE, HEAD, OPTIONS');
  res.header('Access-Control-Max-Age', 86400);
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

app.use('/api', require('./routes'));

app.all('*', (req, res) => {
  res.status(404).send('Not found!');
});

module.exports = app;
