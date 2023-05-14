/* eslint-disable no-console */
const mongoose = require('mongoose');
const http = require('http');
const Server = require('socket.io').Server;
const cors = require('cors');

const app = require('./app');
const useSocket = require('./socket');
require('dotenv').config();

const server = http.createServer(app);
const io =
  process.env.NODE_ENV === 'production'
    ? 
    new Server(server, {
        allowRequest: (req, callback) => {
          callback(null, req.headers.origin === undefined);
        },
      })
    : 
    new Server(server, {
      cors: {
        origin: '*'
      }
    });

if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: '*',
    })
  );
}

const uri = process.env.MONGODB_URI;
mongoose.connect(uri);
const { connection } = mongoose;
connection.once('open', () => {
  console.log('Connection with MongoDB database established!');
});

useSocket(io);

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).end();
});

const port = process.env.PORT || 8081;
server.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});

module.exports = { connection };
