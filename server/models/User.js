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
    type: String,
    required: false
  },
  type: {
    type:String,
    enum: ['Consumer', 'Farmer'],
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
    {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        default: 'Fruit',
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },

  ],
  cart: [
    {
      name:{
        type:String,
      },
      quantity: {
        type: Number,
        default: 1
      },
      price:{
        type: Number,
        required: true
      }
    }
  ],
  addresses: [
    {
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
  }
]
})

const User=mongoose.model('User', UserSchema);
module.exports=User;