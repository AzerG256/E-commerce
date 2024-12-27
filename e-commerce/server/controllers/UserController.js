const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const bcrypt = require('bcrypt');
require('dotenv').config();


// Register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      // Create a new user
      const user = await User.create({ name, email, password });
      if (user) {
        res.status(201).json({
          id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id), // Generate JWT token
        });
      } else {
        res.status(400).json({ message: 'Invalid user data' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user && (await user.comparePassword(password))) {
        res.json({
          id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id), // Generate JWT token
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  // Protected route example (e.g., user profile)
  const getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (user) {
        res.json({
          id: user._id,
          name: user.name,
          email: user.email,
        });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  const updateUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
  
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
          user.password = req.body.password;
        }
  
        const updatedUser = await user.save();
  
        res.json({
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          token: generateToken(updatedUser._id), // Generate JWT token
        });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile, // Ensure this is exported
  };