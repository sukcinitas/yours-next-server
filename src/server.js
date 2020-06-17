/* eslint-disable no-console */
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');
const app = require('./app');
require('dotenv').config();

const server = http.createServer(app);
const io = socketIO(server);

const uri = process.env.MONGODB_URI;
mongoose.connect(uri,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const { connection } = mongoose;
connection.once('open', () => {
  console.log('Connection with MongoDB database established!');
});

let state = {
  group: {
    activeMembers: [],
    chosenEmojis: [],
    messages: [],
  }
}
io.on('connection', (socket) => {
  let client;
  let group;
  socket.on('authenticate', (data) => { // when user authenticates he joins the group's room
    group = data.name;
    socket.join(group);
    io.sockets.in(group).emit('joinmessage', { message: `Successfully joined room named ${group}` });
    if (state.group.activeMembers.length !== 0) {
      socket.emit('setInitialState', state);
    }
  });
  socket.on('sendMessage', (data) => {
    io.sockets.in(group).emit('sendMessage', data);
    console.log(data, 'inside set message');
    state.group.messages = [...state.group.messages, {message: data.message, name: data.member }];
  });
  socket.on('addMember', (data) => {
    state.group.activeMembers = [...state.group.activeMembers, data];
    state.group.chosenEmojis = [...state.group.chosenEmojis, data.emoji];
    io.sockets.in(group).emit('addMember', data);
  });
  // I only set member in sender
  socket.on('setMember', (data) => {
    client = data;
    socket.emit('setMember', data);
  });
  socket.on('disconnect', () => {
    if (!client) {
      return;
    }
    state.group.activeMembers = state.group.activeMembers.filter(member => member.name !== client.name );
    io.sockets.in(group).emit('removeMember', client);
  });
});

const port = process.env.PORT || 8081;
server.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
