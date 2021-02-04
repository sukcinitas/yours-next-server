const GroupService = require('../services/group.service');
const { compareSync } = require('bcryptjs');

const GroupController = {
  async createGroup(req, res) {
    try {
      const { name, passcode } = req.body;
      if (!name || !passcode) {
        return res.status(500).json({
          success: false,
          type: 'general',
          message: 'Failed to create the group!',
        });
      }
      if (await GroupService.checkIfGroupExists(name)) {
        return res.status(500).json({
          success: false,
          type: 'name',
          message: 'Name is already in use!',
        });
      }
      await GroupService.createGroup({ name, passcode });
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
  async authenticate(req, res) {
    try {
      const { name, passcode } = req.body;
      if (!name || !passcode) {
        return res.status(500).json({
          success: false,
          type: 'general',
          message: 'Authentication failed!',
        });
      }
      const groupInfo = await GroupService.getGroupInfo(name);
      if (!groupInfo) {
        return res.status(500).json({
          success: false,
          type: 'name',
          message: 'Group with this name is not found!',
        });
      }
      if (compareSync(passcode, groupInfo.passcode)) {
        return res.json({
          success: true,
          message: 'Authentication succeeded!',
        });
      }
      return res.status(500).json({
        success: false,
        type: 'passcode',
        message: 'Passcode is incorrect!',
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        type: 'general',
        message: 'Authentication failed!',
        error: err.message,
      });
    }
  },
};

module.exports = GroupController;
