let state = {};
module.exports = (io) =>
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
      if(state[group].activeMembers.some((member) => {
        member.name === data.name && member.emoji === data.emoji;
      })) {
        return;
      }
      state[group].activeMembers.push(data);
      io.sockets.in(group).emit('addMember', data);
    });
    // I only set member in sender
    socket.on('setMember', (data) => {
      client = data;
    });
    socket.on('sendMessage', (data) => {
      io.sockets.in(group).emit('sendMessage', data);
      if (state[group]) { // fallback so it wouldn't crash
        state[group].messages = [...state[group].messages, {message: data.message, member: data.member }];
      }
    });
    socket.on('updatePlaylists', (data) => {
      io.sockets.in(group).emit('updatePlaylists', { playlists: data.playlists });
    });
    socket.on('updatePlaylist', (data) => {
      io.sockets.in(group).emit('updatePlaylist', { 
        idsArray: data.idsArray, 
        itemData: data.itemData,
        type: data.type, 
        alreadyIn: data.alreadyIn,
        id: data.id,
      });
    });
    socket.on('userJoinsOngoingPlaylist', () => {
      io.sockets.in(group).emit('userJoinsOngoingPlaylist');  
    });
    socket.on('setOngoingPlaylist', (data) => {
      state[group].ongoingPlaylist.id = data.id;
      state[group].ongoingPlaylist.videoIndex = data.videoIndex;
      state[group].ongoingPlaylist.time = data.time;
      state[group].ongoingPlaylist.paused = false;
      io.sockets.in(group).emit('setOngoingPlaylist', state[group].ongoingPlaylist);
    });
    socket.on('changeOngoingPlaylistVideoIndex', (data) => {
      state[group].ongoingPlaylist.videoIndex = data.videoIndex;
      io.sockets.in(group).emit('changeOngoingPlaylistVideoIndex', { videoIndex: data.videoIndex });
    });
    socket.on('toggleOngoingPlaylist', (data) => {
      io.sockets.in(group).emit('toggleOngoingPlaylist', { paused: data.paused });
    });
    socket.on('disconnect', (reason) => {
      console.log(reason, state);
      if (!state[group] || !client) {
        return;
      }
      if (state[group].activeMembers.length === 1 ) { // last one to disconnect
        group ? delete state[group] : ''; 
        return;
      }
      state[group].activeMembers = state[group].activeMembers.filter(member => member.name !== client.name );
      io.sockets.in(group).emit('removeMember', { client: client.name, emoji: client.emoji });
      if (client.name === state[group].moderator && state[group].activeMembers.length !== 0) {
        io.sockets.in(group).emit('setModerator', { name: state[group].activeMembers[0].name }); 
        state[group].moderator = state[group].activeMembers[0].name;
      }
      console.log(state);
    });
    socket.on('setModerator', (name) => {
      io.sockets.in(group).emit('setModerator', { name }); 
    });
    socket.on('ping',() => {
      console.log('ping');
    })
});
