const mongoose, { Schema } = require('mongoose');

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true, 
    minlength: 3,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true, 
  },
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;