const router = require('express').Router();

const authorize = require('../authorize');
const PlaylistController = require('../controllers/playlist.controller');

const catchErr = (f) => (req, res, next) =>
  f(req, res).catch((err) => next(err));

router
  .route('/')
  .get(authorize, catchErr(PlaylistController.getPlaylists))
  .post(authorize, catchErr(PlaylistController.createPlaylist));

router
  .route('/:id')
  .get(authorize, catchErr(PlaylistController.getPlaylist))
  .delete(authorize, catchErr(PlaylistController.deletePlaylist))
  .put(authorize, catchErr(PlaylistController.updatePlaylist));

router
  .route('/:id/removeItem')
  .put(authorize, catchErr(PlaylistController.removeItemFromPlaylist));

module.exports = router;
