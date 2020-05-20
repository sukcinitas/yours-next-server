const router = require('express').Router();
const GroupControlerr = require('../controllers/group.controller');

router.post('/create', GroupControlerr.createGroup);

module.exports = router;
