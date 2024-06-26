const state = {};
module.exports = (io) => io.on('connection', (socket) => {
  let client;
  let group;

  socket.on('getInitialState', (data) => {
    // when user authenticates/creates he joins the group's room
    group = data.name;
    socket.join(group);
    if (Object.keys(state).indexOf(group) !== -1) {
      socket.emit('setInitialState', {
        group: {
          activeMembers: state[group].activeMembers,
          messages: state[group].messages,
          moderator: state[group].moderator,
          ongoingPlaylist: state[group].ongoingPlaylist,
        },
      });
    } else {
      state[group] = {};
      state[group].activeMembers = [];
      state[group].messages = [];
      state[group].moderator = '';
      state[group].ongoingPlaylist = {
        id: '',
        videoIndex: 0,
        time: 0,
      };
    }
  });

  socket.on('addMember', (data) => {
    if (!(group in state) || !('activeMembers' in state[group])) {
      return;
    }
    if (state[group].activeMembers.length === 0) {
      state[group].moderator = data.name;
      socket.emit('setModerator', data);
    }
    if (state[group].activeMembers.filter((member) => member.name === data.name)
      .length < 1
    ) {
      state[group].activeMembers.push(data);
      io.sockets.in(group).emit('addMember', data);
    }
  });

  // I only set member in sender
  socket.on('setMember', (data) => {
    client = data;
  });

  socket.on('sendMessage', (data) => {
    io.sockets.in(group).emit('sendMessage', data);
    if ((group in state)) {
      if (state[group].messages.length === 0) {
        state[group].messages = [
          ...state[group].messages,
          { message: [data.message], member: data.member },
        ];
        return;
      }

      let lastMessage = state[group].messages[state[group].messages.length - 1];
      if (lastMessage.member.name === data.member.name
        && lastMessage.member.emoji === data.member.emoji) {
        const messages = [...state[group].messages];
        lastMessage = {
          member: lastMessage.member,
          message: [...lastMessage.message, data.message],
        };
        messages[messages.length - 1] = lastMessage;
        state[group].messages = [
          ...messages,
        ];
        return;
      }

      state[group].messages = [
        ...state[group].messages,
        { message: [data.message], member: data.member },
      ];
    }
  });

  socket.on('updatePlaylists', (data) => {
    io.sockets
      .in(group)
      .emit('updatePlaylists', { playlists: data.playlists });
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
    if (!(group in state)) {
      return;
    }
    state[group].ongoingPlaylist.id = data.id;
    state[group].ongoingPlaylist.videoIndex = data.videoIndex;
    state[group].ongoingPlaylist.time = data.time;
    state[group].ongoingPlaylist.paused = false;
    io.sockets
      .in(group)
      .emit('setOngoingPlaylist', state[group].ongoingPlaylist);
  });

  socket.on('changeOngoingPlaylistVideoIndex', (data) => {
    state[group].ongoingPlaylist.videoIndex = data.videoIndex;
    io.sockets.in(group).emit('changeOngoingPlaylistVideoIndex', {
      videoIndex: data.videoIndex,
    });
  });

  socket.on('toggleOngoingPlaylist', (data) => {
    io.sockets
      .in(group)
      .emit('toggleOngoingPlaylist', { paused: data.paused });
  });

  socket.on('disconnect', (reason) => {
    if (!(group in state) || !client) {
      return;
    }
    state[group].activeMembers = state[group].activeMembers.filter(
      (member) => member.name !== client.name,
    );
    io.sockets
      .in(group)
      .emit('removeMember', { client: client.name, emoji: client.emoji });
    if (
      reason === 'client namespace disconnect'
    ) {
      if (
        client.name === state[group].moderator
        && state[group].activeMembers.length !== 0
      ) {
        io.sockets
          .in(group)
          .emit('setModerator', { name: state[group].activeMembers[0].name });
        state[group].moderator = state[group].activeMembers[0].name;
      }
      if (state[group].activeMembers.length <= 0) {
        delete state[group];
      }
    }
  });

  socket.on('setModerator', (name) => {
    if (!(group in state)) {
      return;
    }
    io.sockets.in(group).emit('setModerator', { name });
    state[group].moderator = name;
  });
});
