const mongoose = require('mongoose');
const http = require('http');
const app = require('./app');
require('dotenv').config();

const server = http.createServer(app);
const io = require('socket.io')(server);

const uri = process.env.MONGODB_URI;
mongoose.connect(uri,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const { connection } = mongoose;
connection.once('open', () => {
  console.log('Connection with MongoDB database established!');
});

io.on('connection', (socket) => {
  let group;
  socket.on('authenticate', (data) => { // when user authenticates he joins the group's room
    group = data.name;
    socket.join(group);
    io.sockets.in(group).emit('joinmessage', { message: 'Successfully joined room named ' + group });
  });
  socket.on('sendMessage', (data) => {
    io.sockets.in(group).emit('sendMessage', data);
  });
  socket.on('addMember', (data) => {
    io.sockets.in(group).emit('addMember', data);
  });
});

server.listen(process.env.PORT || 8081, () => {
  console.log('Server is running on port 8081!');
});
