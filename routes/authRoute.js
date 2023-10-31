const express = require('express');
const router = express.Router();

// const { adminController, sweeperController } = require('../controllers');
const { getRegisterPage, registerUser, getLoginPage, loginUser, logoutUser } = require('../controllers/userController.js');

router.get('/register', getRegisterPage)
router.get('/login/:role', getLoginPage);
router.get('/logout/:role', logoutUser);

router.post('/register', registerUser);
router.post('/login/admin', loginUser);
router.post('/login/sweeper', loginUser);

module.exports = router;