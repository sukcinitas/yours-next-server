const mongoose = require('mongoose');
const { hashSync } = require('bcryptjs');
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

groupSchema.pre('save', function hashPassword() {
  if (this.isModified('passcode')) {
    this.passcode = hashSync(this.passcode, 10);
  }
});
const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
