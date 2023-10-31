const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/imageController');
const { getSweeperDashboard, getCleanerPage } = require('../controllers/sweeperController.js');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth.js');
const upload = require('../middleware/imageUpload.js');

router.get('/sweeper-dashboard', isAuthenticatedUser, authorizeRoles('sweeper'), getSweeperDashboard);
router.get('/cleaner', isAuthenticatedUser, authorizeRoles('sweeper'), getCleanerPage);

router.post('/upload', isAuthenticatedUser, authorizeRoles('sweeper'), upload, uploadImage);

module.exports = router;