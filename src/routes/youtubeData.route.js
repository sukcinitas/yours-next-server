const router = require('express').Router();

const authorize = require('../authorize');
const YoutubeDataController = require('../controllers/youtubeData.controller');

const catchErr = (f) => (req, res, next) => f(req, res).catch((err) => next(err));

// api/data/search?q=&pageToken=
router.get('/search', authorize, catchErr(YoutubeDataController.search));

// api/data/playlists?channelId=&pageToken=
router.get('/playlists', authorize, catchErr(YoutubeDataController.getPlaylists));

// api/data/playlistItems/playlistId=&pageToken=
router.get('/playlistItems', authorize, catchErr(YoutubeDataController.getPlaylistItems));

// api//data/videos?idList=&pageToken=
router.get('/videos', authorize, catchErr(YoutubeDataController.getVideos));

module.exports = router;
