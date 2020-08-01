const GroupService = require('../services/group.service');

const GroupController = {
  async createGroup(req, res) {
    try {
      const { name, passcode } = req.body;
      if (!name || !passcode) {
        return res.json({
          success: false,
          message: 'Failed to create the group!',
        });
      }
      if (await GroupService.checkIfGroupExists(name)) {
        return res.json({
          success: false,
          message: 'Name is already in use!',
        });
      }
      await GroupService.createGroup({ name, passcode });
      return res.json({
        success: true,
        message: 'Group has been successfully created!',
      });
    } catch (err) {
      return res.json({
        success: false,
        message: 'Failed to create the group!',
        err: err.message,
      });
    }
  },
  async authenticate(req, res) {
    try {
      const { name, passcode } = req.body;
      if (!name || !passcode) {
        return res.json({
          success: false,
          message: 'Authentication failed!',
        });
      }
      const groupInfo = await GroupService.getGroupInfo(name);
      if (!groupInfo) {
        return res.json({
          success: false,
          message: 'Group with this name is not found!',
        });
      }
      if (passcode === groupInfo.passcode) {
        return res.json({
          success: true,
          message: 'Authentication succeeded!',
        });
      }
      return res.json({
        success: false,
        message: 'Passcode is incorrect!',
      });
    } catch (err) {
      console.log(err);
      return res.json({
        success: false,
        message: 'Authentication failed!',
        error: err.message,
      });
    }
  },
};

module.exports = GroupController;
