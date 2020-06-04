const router = require('express').Router();
const PlaylistController = require('../controllers/playlist.controller');

router.route('/')
  // .get((req,res) => PlaylistController.getPlaylists(req, res).catch(err => res.send('Hey')))
  .get(PlaylistController.getPlaylists)
  .post(PlaylistController.createPlaylist);

router.route('/:id')
  .get(PlaylistController.getPlaylist)
  .delete(PlaylistController.deletePlaylist)
  .put(PlaylistController.updatePlaylist);

router.route('/:id/removeItem')
  .put(PlaylistController.removeItemFromPlaylist);
  
module.exports = router;
