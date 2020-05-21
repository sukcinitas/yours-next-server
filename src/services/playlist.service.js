const Playlist = require('../models/playlist.model');

const PlaylistService = {
  async getPlaylists(createdBy) {
    try {
      const playlists = await Playlist.find({ createdBy });
      return playlists;
    } catch (err) {
      throw Error(err.errmsg);
    }
  },
  async getPlaylist(id) {
    try {
      const playlist = await Playlist.findById(id);
      return playlist;
    } catch (err) {
      throw Error(err.errmsg);
    }
  },
  async createPlaylist(title, createdBy) {
    try {
      const newPlaylist = new Playlist({
        title,
        createdBy,
        items: [],
      });
      await newPlaylist.save();
      return 'Playlist has been successfully saved!';
    } catch (err) {
      throw Error(err.errmsg);
    }
  },
  async deletePlaylist(id) {
    try {
      await Playlist.findByIdAndDelete(id);
      return 'Playlist has been successfully deleted!';
    } catch (err) {
      throw Error(err.errmsg);
    }
  },
  async updatePlaylist(id, item) {
    try {
      await Playlist.updateOne({ _id: id }, { $push: { items: item } });
      return;
    } catch (err) {
      throw Error(err.errmsg);
    }
  },
};

module.exports = PlaylistService;
