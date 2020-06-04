const PlaylistService = require('../services/playlist.service');

const PlaylistController = {
  async getPlaylists(req, res) {
    try {
      const createdBy = req.query.group;
      const playlists = await PlaylistService.getPlaylists(createdBy);
      return res.json({ success: true, playlists });
    } catch (err) {
      return res.json({ success: false, message: 'Could not get playlists!', error: err.message });
    }
  },
  async getPlaylist(req, res) {
    try {
      const { id } = req.params;
      const playlist = await PlaylistService.getPlaylist(id);
      return res.json({ success: true, playlist });
    } catch (err) {
      return res.json({ success: false, message: 'Could not get playlist!', error: err.message });
    }
  },
  async createPlaylist(req, res) {
    try {
      const { title, createdBy } = req.body;
      const playlist = await PlaylistService.createPlaylist({ title, createdBy });
      return res.json({ success: true, playlist, message: 'Playlist has been successfully created!' });
    } catch (err) {
      return res.json({ success: false, message: 'Could not create playlist!', error: err.message });
    }
  },
  async deletePlaylist(req, res) {
    try {
      const { id } = req.params;
      await PlaylistService.deletePlaylist(id);
      return res.json({ success: true, message: 'Playlist has been successfully deleted!' });
    } catch (err) {
      return res.json({ success: false, message: 'Could not delete playlist!', error: err.message });
    }
  },
  async updatePlaylist(req, res) {
    try {
      const { id } = req.params;
      const { item } = req.body;
      if (!item) {
        return res.json({ success: false, message: 'Could not update playlist!' }); 
      }
      await PlaylistService.updatePlaylist({ id, item });
      const playlist = await PlaylistService.getPlaylist(id);
      return res.json({ success: true, playlist });
    } catch (err) {
      return res.json({ success: false, message: 'Could not update playlist!', error: err.message });
    }
  },
  async removeItemFromPlaylist(req, res) {
    try {
      const { id } = req.params;
      const { item } = req.body;
      if (!item) {
        return res.json({ success: false, message: 'Could not delete playlist item!' }); 
      }
      await PlaylistService.removeItemFromPlaylist({ id, item });
      return res.json({ success: true, message: 'Item has been successfully deleted!' });
    } catch (err) {
      return res.json({ success: false, message: 'Could note delete playlist item!', error: err.message});
    }
  }
};

module.exports = PlaylistController;
