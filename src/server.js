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

let state = {};
io.on('connection', (socket) => {
  let client;
  let group;
  socket.on('getInitialState', (data) => { // when user authenticates/creates he joins the group's room
    group = data.name;
    socket.join(group);
    if (Object.keys(state).indexOf(group) !== -1) {
      socket.emit('setInitialState', { group: 
        { 
          activeMembers: state[group].activeMembers,
          messages: state[group].messages, 
          moderator: state[group].moderator,
          ongoingPlaylist: state[group].ongoingPlaylist,
        }});
    } else {
      state[group] = {};
      state[group].activeMembers = [];
      state[group].messages = [];
      state[group].moderator = '',
      state[group].ongoingPlaylist = {
        id: '',
        videoIndex: 0,
        time: 0, 
      }
    }
  });
  socket.on('addMember', (data) => {
    if (state[group].activeMembers.length === 0) {
      state[group].moderator = data.name;
      socket.emit('setModerator', data);
    }
    state[group].activeMembers.push(data);
    io.sockets.in(group).emit('addMember', data);
  });
  // I only set member in sender
  socket.on('setMember', (data) => {
    client = data;
    socket.emit('setMember', data);
  });
  socket.on('sendMessage', (data) => {
    io.sockets.in(group).emit('sendMessage', data);
    state[group].messages = [...state[group].messages || [], {message: data.message, name: data.member }];
  });
  socket.on('updatePlaylists', (data) => {
    io.sockets.in(group).emit('updatePlaylists', { playlists: data.playlists });
  });
  socket.on('updatePlaylist', (data) => {
    io.sockets.in(group).emit('updatePlaylist', { idsArray: data.idsArray, items: data.items });
  });
  socket.on('setOngoingPlaylist', (data) => {
    state[group].ongoingPlaylist.id = data.id || state[group].ongoingPlaylist.id;
    state[group].ongoingPlaylist.videoIndex = data.videoIndex || state[group].ongoingPlaylist.videoIndex;
    state[group].ongoingPlaylist.time = data.time || state[group].ongoingPlaylist.time;
    io.sockets.in(group).emit('setOngoingPlaylist', state[group].ongoingPlaylist);
  });
  socket.on('changeOngoingPlaylistVideoIndex', (data) => {
    state[group].ongoingPlaylist.videoIndex = data.videoIndex;
    io.sockets.in(group).emit('changeOngoingPlaylistVideoIndex', { videoIndex: data.videoIndex });
  });
  socket.on('pauseOngoingPlaylist', () => {
    io.sockets.in(group).emit('pauseOngoingPlaylist');
  });
  socket.on('playOngoingPlaylist', () => {
    io.sockets.in(group).emit('playOngoingPlaylist');
  });
  socket.on('disconnect', () => {
    if (!client) {
      return;
    }
    state[group].activeMembers = state[group].activeMembers.filter(member => member.name !== client.name );
    io.sockets.in(group).emit('removeMember', { client: client.name, emoji: client.emoji });
    if (client.name === state[group].moderator && state[group].activeMembers.length !== 0) {
      io.sockets.in(group).emit('setModerator', { name: state[group].activeMembers[0].name }); 
      state[group].moderator = state[group].activeMembers[0].name;
    }
  });
  socket.on('setModerator', (name) => {
    io.sockets.in(group).emit('setModerator', { name }); 
  });
});

const port = process.env.PORT || 8081;
server.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
