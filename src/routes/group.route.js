const router = require('express').Router();

const GroupControler = require('../controllers/group.controller');

const catchErr = (f) => (req, res, next) => f(req, res, next).catch((err) => next(err));

router.post('/create', catchErr(GroupControler.createGroup));
router.post('/authenticate', catchErr(GroupControler.authenticate));
router.get('/isLoggedIn', catchErr(GroupControler.isLoggedIn));
router.get('/logout', catchErr(GroupControler.logout));

module.exports = router;
