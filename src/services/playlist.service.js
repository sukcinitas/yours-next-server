const Playlist = require('../models/playlist.model');

const PlaylistService = {
  async getPlaylists(createdBy) {
    try {
      const playlists = await Playlist.find({ createdBy }).exec();
      return playlists;
    } catch (err) {
      throw Error(err.message);
    }
  },
  async getPlaylist(id) {
    try {
      const playlist = await Playlist.findById(id).exec();
      return playlist;
    } catch (err) {
      throw Error(err.message);
    }
  },
  async createPlaylist({ title, createdBy }) {
    try {
      const newPlaylist = new Playlist({
        title,
        createdBy,
        items: [],
      });
      await newPlaylist.save();
      return newPlaylist;
    } catch (err) {
      throw Error(err.message);
    }
  },
  async deletePlaylist(id) {
    try {
      await Playlist.findByIdAndDelete(id).exec();
      return 'Playlist has been successfully deleted!';
    } catch (err) {
      throw Error(err.message);
    }
  },
  async updatePlaylist({ id, item }) {
    try {
      await Playlist.updateOne({ _id: id }, { $push: { items: item } }).exec();
      return;
    } catch (err) {
      throw Error(err.message);
    }
  },
  async removeItemFromPlaylist({ id, items }) {
    try {
      const playlist = await Playlist.findById(id).exec();
      let newItems = playlist.items;
      for (let i = 0; i < items.length; i++) {
        newItems = newItems.filter(video => video !== items[i]);
      }
      playlist.items = newItems;
      await playlist.save();
      return 'Item has been successfully deleted!';
    } catch (err) {
      throw Error(err.message);
    }
  },
};

module.exports = PlaylistService;
