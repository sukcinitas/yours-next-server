const mongoose = require('mongoose');
const http = require('http');
const app = require('./app');
require('dotenv').config();

const server = http.createServer(app);

const uri = process.env.MONGODB_URI;
mongoose.connect(uri,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const { connection } = mongoose;
connection.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('Connection with MongoDB database established!');
});

server.listen(process.env.PORT || 8081, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on port 8081!');
});
