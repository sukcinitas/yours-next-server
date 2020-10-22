const router = require('express').Router();
const PlaylistController = require('../controllers/playlist.controller');

const catchErr = (f) => (req, res, next) => f(req, res)
	.catch((err) => next(err));

router.route('/')
  .get(catchErr(PlaylistController.getPlaylists))
  .post(catchErr(PlaylistController.createPlaylist));

router.route('/:id')
  .get(catchErr(PlaylistController.getPlaylist))
  .delete(catchErr(PlaylistController.deletePlaylist))
  .put(catchErr(PlaylistController.updatePlaylist));

router.route('/:id/removeItem')
  .put(catchErr(PlaylistController.removeItemFromPlaylist));
  
module.exports = router;
