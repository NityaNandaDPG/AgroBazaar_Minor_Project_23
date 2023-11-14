const express = require("express");
// const bodyParser = require("body-parser");


const admin=express.Router();
// auth.use(bodyParser.json());
const User=require('../../models/User.js');

admin.get("/users", async (req, res) => {
    try {
      const docs = await User.find({});
      res.json(docs);
    } catch (error) {
      console.error("Get all users error:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  module.exports=admin;