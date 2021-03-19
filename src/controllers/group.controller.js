const passport = require('passport');

require('../passport.config');
const GroupService = require('../services/group.service');

const GroupController = {
  async createGroup(req, res) {
    try {
      const { name, passcode } = req.body;
      if (!name || !passcode) {
        return res.status(400).json({
          success: false,
          type: 'general',
          message: 'Bad request! Failed to create the group!',
        });
      }
      const doesGroupExist = await GroupService.checkIfGroupExists(name);
      if (doesGroupExist) {
        return res.status(500).json({
          success: false,
          type: 'name',
          message: 'Name is already in use!',
        });
      }
      const group = await GroupService.createGroup({ name, passcode });
      req.login(group, (loginErr) => {
        if (loginErr) {
          return res.status(500).json({
            success: false,
            message: 'Authentication failed!',
            type: 'general',
          });
        }
      });
      return res.json({
        success: true,
        message: 'Group has been successfully created!',
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        type: 'general',
        message: 'Failed to create the group!',
        err: err.message,
      });
    }
  },

  async authenticate(req, res, next) {
    try {
      return passport.authenticate('local', { session: true }, (err, group) => {
        if (err) {
          const { message, type, status } = err;
          return res.status(status).json({
            success: false,
            message,
            type,
          });
        }
        if (!group) {
          return res.status(401).json({
            success: false,
            message: 'Username or password is incorrect!',
            type: 'general',
          });
        }
        req.login(group, (loginErr) => {
          if (loginErr) {
            return res.status(500).json({
              success: false,
              message: 'Authentication failed!',
              type: 'general',
            });
          }
        });
        return res.json({
          success: true,
          message: 'Authentication succeeded!',
        });
      })(req, res, next);
    } catch (err) {
      return res.status(500).json({
        success: false,
        type: 'general',
        message: 'Authentication failed!',
        error: err.message,
      });
    }
  },

  async isLoggedIn(req, res) {
    try {
      if (!req.user) {
        return res.json({
          success: false,
        });
      }
      return res.json({
        success: true,
        group: req.user.name,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Could not check if user is logged in!',
        error: err.message,
      });
    }
  },

  async logout(req, res) {
    try {
      await req.logout();
      return res.json({
        success: true,
        message: 'User has successfully logged out!',
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Logout failed!',
        error: err.message,
      });
    }
  },
};

module.exports = GroupController;
