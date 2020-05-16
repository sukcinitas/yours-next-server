const app = require('express')();
const YoutubeDataService = require('../services/youtubeData.service');

// /data/search?q=&pageToken=
app.get('/search', async (req, res) => {
  const { q } = req.query;
  const pageToken = req.query.pageToken || ''; // undefined is falsey
  const { data } = await YoutubeDataService.search(q, pageToken);
  res.json(data);
});

// data/playlist?channelId=&pageToken=
app.get('/playlists', async (req, res) => {
  const { channelId } = req.query;
  const pageToken = req.query.pageToken || '';
  const { data } = await YoutubeDataService.getPlaylists(channelId, pageToken);
  res.json(data);
});

// /data/playlistItems/playlistId=&pageToken=
app.get('/playlistItems', async (req, res) => {
  const { playlistId } = req.query;
  const pageToken = req.query.pageToken || '';
  const { data } = await YoutubeDataService.getPlaylistItems(playlistId, pageToken);
  res.json(data);
});

module.exports = app;
