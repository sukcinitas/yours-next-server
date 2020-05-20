const YoutubeDataService = require('../services/youtubeData.service');

const YoutubeDataController = {
  async search(req, res) {
    try {
      const { q } = req.query;
      const pageToken = req.query.pageToken || ''; // undefined is falsey
      const { data } = await YoutubeDataService.search(q, pageToken);
      return res.json({ success: true, data });
    } catch (err) {
      return res.json({ success: false, message: 'Could not get results!' });
    }
  },
  async getPlaylists(req, res) {
    try {
      const { channelId } = req.query;
      const pageToken = req.query.pageToken || '';
      const { data } = await YoutubeDataService.getPlaylists(channelId, pageToken);
      return res.json({ success: true, data });
    } catch (err) {
      return res.json({ success: false, message: 'Could not get results!' });
    }
  },
  async getPlaylistItems(req, res) {
    try {
      const { playlistId } = req.query;
      const pageToken = req.query.pageToken || '';
      const { data } = await YoutubeDataService.getPlaylistItems(playlistId, pageToken);
      return res.json({ success: true, data });
    } catch (err) {
      return res.json({ success: false, message: 'Could not get results!' });
    }
  },
  async getVideos(req, res) {
    try {
      const { idList } = req.query;
      const pageToken = req.query.pageToken || '';
      const { data } = await YoutubeDataService.getVideos(idList, pageToken);
      return res.json({ success: true, data });
    } catch (err) {
      return res.json({ success: false, message: 'Could not get results!' });
    }
  },
};

module.exports = YoutubeDataController;
