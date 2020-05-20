const router = require('express').Router();
const YoutubeDataController = require('../controllers/youtubeData.controller');

// api/data/search?q=&pageToken=
router.get('/search', YoutubeDataController.search);

// api/data/playlists?channelId=&pageToken=
router.get('/playlists', YoutubeDataController.getPlaylists);

// api/data/playlistItems/playlistId=&pageToken=
router.get('/playlistItems', YoutubeDataController.getPlaylistItems);

// api//data/videos?idList=&pageToken=
router.get('/videos', YoutubeDataController.getVideos);

module.exports = router;
