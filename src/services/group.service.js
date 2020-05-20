const Group = require('../models/group.model');

const GroupService = {
  async createGroup(name, password) {
    try {
      const newGroup = new Group({
        name,
        password,
      });
      await newGroup.save();
      return 'Group has been successfully saved!';
    } catch (err) {
      throw Error(err);
    }
  },
  async checkIfGroupExists(name) {
    try {
      const group = await Group.findOne({ name }, '-password');
      if (group) { return true; }
      return false;
    } catch (err) {
      throw Error(err);
    }
  },
  async getGroupInfo(name) {
    try {
      const group = await Group.findOne({ name });
      return group;
    } catch (err) {
      throw Error(err);
    }
  },
};

module.exports = GroupService;
