const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/UserController');
const { protect } = require('../middleware/authMiddleware'); // For protected routes

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to log in an existing user
router.post('/login', loginUser);

// Example protected route to get the logged-in user's profile
router.get('/profile', protect, getUserProfile);

module.exports = router;
