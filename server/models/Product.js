
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ProductSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  
  author: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  published_date: {
    type: Date,
    default: Date.now
  }
});

const Product=mongoose.model('Product', ProductSchema);
module.exports=Product;