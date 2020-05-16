const app = require('express')();

app.get('/', (req, res) => {
  res.send('Hello to home page');
});

app.use('/data', require('./data'));

app.all('*', (req, res) => {
  res.status(404).send({ msg: 'Not found' });
});

module.exports = app;
