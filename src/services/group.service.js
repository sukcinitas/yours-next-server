const Group = require('../models/group.model');

const GroupService = {
  async createGroup({ name, passcode }) {
    const newGroup = new Group({
      name,
      passcode,
    });
    await newGroup.save();
    return;
  },
  async checkIfGroupExists(name) {
    const group = await Group.findOne({ name }, '-passcode').exec();
    if (group) {
      return true;
    }
    return false;
  },
  async getGroupInfo(name) {
    const group = await Group.findOne({ name }).exec();
    return group;
  },
};

module.exports = GroupService;
