const Group = require('../models/group.model');

const GroupService = {
  createGroup(name, password) {
    try {
      const newGroup = new Group({
        name,
        password,
      });
      await newGroup.save();
      return 'Group has been successfully saved!';
    } catch (err) {
      console.error(err);
    }
  },
  async checkIfGroupExists(name) {
    try {
      const group = await Group.findOne({ name }, -password -playlists);
      if (group) { return true ;}
      return false;
    } catch(err) {
      console.error(err);
    }
  },
};

module.exports = GroupService;