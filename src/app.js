const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static('client/dist'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Method', 'GET, POST, PUT, PATCH, POST, DELETE, HEAD, OPTIONS');
  res.header('Access-Control-Max-Age', 86400);
  next();
});

app.use('/api', require('./routes'));

app.all('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = app;
