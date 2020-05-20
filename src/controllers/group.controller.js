const GroupService = require('../services/group.service');

const GroupController = {
  async createGroup(req, res) {
    const { name, password } = req.body;
    if (await GroupService.checkIfGroupExists(name)) {
      return res.json({
        success: false,
        message: 'Name is already in use!',
      });
    }
    await GroupService.createGroup(name, password);
    return res.json({
      success: true,
      message: 'Group has been successfully created!',
    });
  },
};

module.exports = GroupController;
