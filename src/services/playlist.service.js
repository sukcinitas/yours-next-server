import Playlist from '../models/playlist.model';

const PlaylistService = {
  async createPlaylist(name, createdBy) {
    try {
      const newPlaylist = new Playlist({
        name,
        createdBy,
        items: [],
      });
      await newPlaylist.save();
      return 'Playlist has been successfully saved!';
    } catch (err) {
      console.error(err);
    }
  },
  async deletePlaylist(id) {
    try {
      await Playlist.findByIdAndDelete(id);
      return 'Playlist has been successfully deleted!';
    } catch (err) {
      console.error(err);
    }
  },
  async updatePlaylist(id, item) {
    try {
      const playlist = await Playlist.update({_id: id}, {$push: { items: item }});
      return playlist;
    } catch(err) {
      console.error(err);
    }
  }
};

module.exports = PlaylistService;