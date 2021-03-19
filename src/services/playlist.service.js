const Playlist = require('../models/playlist.model');

const PlaylistService = {
  async getPlaylists(createdBy) {
    const playlists = await Playlist.find({ createdBy }).exec();
    return playlists;
  },

  async getPlaylist(id) {
    const playlist = await Playlist.findById(id).exec();
    return playlist;
  },

  async createPlaylist({ title, createdBy }) {
    const newPlaylist = new Playlist({
      title,
      createdBy,
      items: [],
    });
    await newPlaylist.save();
    return newPlaylist;
  },

  async deletePlaylist(id) {
    await Playlist.findByIdAndDelete(id).exec();
    return 'Playlist has been successfully deleted!';
  },

  async updatePlaylist({ id, item }) {
    await Playlist.updateOne({ _id: id }, { $addToSet: { items: item } }).exec();
  },

  async removeItemFromPlaylist({ id, items }) {
    const playlist = await Playlist.findById(id).exec();
    let newItems = playlist.items;
    for (let i = 0; i < items.length; i += 1) {
      newItems = newItems.filter((video) => video !== items[i]);
    }
    playlist.items = newItems;
    await playlist.save();
    return 'Item has been successfully deleted!';
  },
};

module.exports = PlaylistService;
