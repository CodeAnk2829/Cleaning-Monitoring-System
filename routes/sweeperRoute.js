const express = require('express');
const router = express.Router();
const { getSweeperDashboard, uploadImage } = require('../controllers/sweeperController.js');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth.js');
const upload = require('../middleware/imageUpload.js');

router.get('/sweeper-dashboard', isAuthenticatedUser, authorizeRoles('sweeper'), getSweeperDashboard);
router.post('/upload/sweeper', upload, uploadImage);

module.exports = router;