const PlaylistService = require('../services/playlist.service');

const PlaylistController = {
  async getPlaylists(req, res) {
    try {
      const createdBy = req.query.group;
      const playlists = await PlaylistService.getPlaylists(createdBy);
      return res.json({ success: true, playlists });
    } catch (err) {
      return res.json({ sucess: false, message: 'Could not get playlists!' });
    }
  },
  async getPlaylist(req, res) {
    try {
      const { id } = req.params;
      const playlist = await PlaylistService.getPlaylist(id);
      return res.json({ success: true, playlist });
    } catch (err) {
      return res.json({ sucess: false, message: 'Could not get playlist!' });
    }
  },
  async createPlaylist(req, res) {
    try {
      const { title, createdBy } = req.body;
      await PlaylistService.createPlaylist(title, createdBy);
      return res.json({ success: true, message: 'Playlist has been successfully created!' });
    } catch (err) {
      return res.json({ sucess: false, message: 'Could not create playlist!' });
    }
  },
  async deletePlaylist(req, res) {
    try {
      const { id } = req.params;
      await PlaylistService.deletePlaylist(id);
      return res.json({ success: true, message: 'Playlist has been successfully deleted!' });
    } catch (err) {
      return res.json({ sucess: false, message: 'Could not delete playlist!' });
    }
  },
  async updatePlaylist(req, res) {
    try {
      const { id } = req.params;
      const { item } = req.body;
      const playlist = await PlaylistService.getPlaylist(id, item);
      return res.json({ success: true, playlist });
    } catch (err) {
      return res.json({ sucess: false, message: 'Could not update playlist!' });
    }
  },
};

module.exports = PlaylistController;
