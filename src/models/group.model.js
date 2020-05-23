const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  passcode: {
    type: String,
    required: true,
  },
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
