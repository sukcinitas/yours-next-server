const app = require('express')();
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.resolve('index.html'));
});

app.use('/data', require('./data.route'));
// app.use('/group', require('./group.route'));

app.all('*', (req, res) => {
  res.status(404).send({ msg: 'Not found' });
});

module.exports = app;
