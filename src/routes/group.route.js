const router = require('express').Router();
const GroupControlerr = require('../controllers/group.controller');

const catchErr = (f) => (req, res, next) =>
  f(req, res).catch((err) => next(err));

router.post('/create', catchErr(GroupControlerr.createGroup));
router.post('/authenticate', catchErr(GroupControlerr.authenticate));

module.exports = router;
