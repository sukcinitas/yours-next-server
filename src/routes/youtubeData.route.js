const router = require('express').Router();
const YoutubeDataController = require('../controllers/youtubeData.controller');

const catchErr = (f) => (req, res, next) =>
  f(req, res).catch((err) => next(err));

// api/data/search?q=&pageToken=
router.get('/search', catchErr(YoutubeDataController.search));

// api/data/playlists?channelId=&pageToken=
router.get('/playlists', catchErr(YoutubeDataController.getPlaylists));

// api/data/playlistItems/playlistId=&pageToken=
router.get('/playlistItems', catchErr(YoutubeDataController.getPlaylistItems));

// api//data/videos?idList=&pageToken=
router.get('/videos', catchErr(YoutubeDataController.getVideos));

module.exports = router;
