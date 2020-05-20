const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

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

const uri = process.env.MONGODB_URI;
mongoose.connect(uri,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const { connection } = mongoose;
connection.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('Connection with MongoDB database established');
});

app.use('/api', require('./routes'));

io.on('connection', (socket) => {
  // eslint-disable-next-line no-console
  console.log('a user connected', socket);
});

http.listen(process.env.PORT || 8081, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on port 8081, sweetheart!');
});
