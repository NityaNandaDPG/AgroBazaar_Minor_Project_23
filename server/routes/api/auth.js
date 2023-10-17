const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User=require('../../models/User.js');

const auth = express.Router();
// server.use(cors());
auth.use(bodyParser.json());

const JWT_SECRET = "jbdfbhbffashjbbf*&kmagra[]{vsdfas}knmasja";

auth.post("/signup", async (req, res) => {
  try {
    const { 
      username,
      firstname,
      lastname,
      email,
      password,
      gender,
      dob,
      avatar,
      type,
      address: {street, city, state, country, pin},
      products} = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "User-Exists" });
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({
      username,
      firstname,
      lastname,
      email,
      password,
      // hashedPassword,
      gender,
      dob,
      avatar,
      type,
      address: {street, city, state, country, pin},
      products
    });

    await newUser.save();
    console.log("New user created:", newUser);

    return res.json({ status: "ok" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

auth.post("/login", async (req,res) => {
  try {
    const { email, password }=req.body;

    const user=await User.findOne({email});
    if (!user) {
      return res.json({ error: "User does not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch)
    // if (password==user.password)
    {
      const token=jwt.sign({}, JWT_SECRET);
      const dataSend={
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        type: user.type,
        avatar: user.avatar,
      };
      return res.json({ status: "ok", data: dataSend, dt: token });
    }
    else {
      return res.json({ status: "error", error: "Invalid password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

auth.get("/getUser",  async (req, res) => {
  // Assuming you have a way to identify the user from the token (e.g., user ID)
  const email = req.body; // Replace with your actual user ID retrieval logic

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Here, you can send the user's profile data as a response
    res.json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

auth.get("/demo", async (req, res) => {
  try {
    const docs = await User.find({});
    res.json(docs);
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports=auth;