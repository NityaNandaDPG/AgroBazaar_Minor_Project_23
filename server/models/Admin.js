const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  dob: {
    type: Date,
    required: true
  },
  role: {
    type:String,
    required: true
  }
})

const Admin = mongoose.model('Admin', AdminSchema);
module.exports =Admin;