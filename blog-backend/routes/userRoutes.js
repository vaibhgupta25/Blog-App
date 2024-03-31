const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { registerUser,
    loginUser,
    userProfile,
    updateProfile,
    updateProfilePicture } = require('../controllers/userControllers');
const { authGuard } = require('../middlewares/authMiddleware')


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authGuard, userProfile);
router.put('/updateProfile', authGuard, updateProfile)
router.put('/updateProfilePicture', authGuard, updateProfilePicture)

module.exports = router; 