const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
    enum: ['Male', 'Female','Others'],
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  avatar: {
    fileName: String,
    filePath: String
  },
  type: {
    type:String,
    enum: ['Consumer', 'Farmer','Supervisor'],
    required: true
  },
  address: {
    street: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    state: {
      type: String,
      required: false
    },
    country: {
      type: String,
      default: 'India',
      required: false
    },
    pin: {
      type: Number,
      required: false
    }
  },
  products:[

  ]
})

const User = mongoose.model('User', UserSchema);
module.exports =User;