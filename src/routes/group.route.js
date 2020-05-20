const router = require('express').Router();
const GroupControlerr = require('../controllers/group.controller');

router.post('/create', GroupControlerr.createGroup);
router.post('/authenticate', GroupControlerr.authenticate);

module.exports = router;
