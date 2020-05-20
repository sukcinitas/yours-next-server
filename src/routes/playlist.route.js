const router = require('express').Router();
const PlaylistController = require('../controllers/playlist.controller');

router.route('/')
  .get(PlaylistController.getPlaylists)
  .post(PlaylistController.createPlaylist);

router.route('/:id')
  .get(PlaylistController.getPlaylist)
  .delete(PlaylistController.deletePlaylist)
  .put(PlaylistController.updatePlaylist);

module.exports = router;
