const Group = require('../models/group.model');

const GroupService = {
  async createGroup(name, passcode) {
    try {
      const newGroup = new Group({
        name,
        passcode,
      });
      await newGroup.save();
      return;
    } catch (err) {
      throw Error(err.message);
    }
  },
  async checkIfGroupExists(name) {
    try {
      const group = await Group.findOne({ name }, '-passcode').exec();
      if (group) { return true; }
      return false;
    } catch (err) {
      throw Error(err.message);
    }
  },
  async getGroupInfo(name) {
    try {
      const group = await Group.findOne({ name }).exec();
      return group;
    } catch (err) {
      throw Error(err.message);
    }
  },
};

module.exports = GroupService;
