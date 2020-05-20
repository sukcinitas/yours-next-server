const YoutubeDataService = require('../services/youtubeData.service');

const YoutubeDataController = {
  async search(req, res) {
    const { q } = req.query;
    const pageToken = req.query.pageToken || ''; // undefined is falsey
    const { data } = await YoutubeDataService.search(q, pageToken);
    return res.json({ data });
  },
  async getPlaylists(req, res) {
    const { channelId } = req.query;
    const pageToken = req.query.pageToken || '';
    const { data } = await YoutubeDataService.getPlaylists(channelId, pageToken);
    return res.json({ data });
  },
  async getPlaylistItems(req, res) {
    const { playlistId } = req.query;
    const pageToken = req.query.pageToken || '';
    const { data } = await YoutubeDataService.getPlaylistItems(playlistId, pageToken);
    return res.json({ data });
  },
  async getVideos(req, res) {
    const { idList } = req.query;
    const pageToken = req.query.pageToken || '';
    const { data } = await YoutubeDataService.getVideos(idList, pageToken);
    return res.json({ data });
  },
};

module.exports = YoutubeDataController;
