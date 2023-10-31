const express = require('express');
const router = express.Router();
const { getAdminDashboard, getSweeperAssignment, setAdmin } = require('../controllers/adminController.js');
const { getWashroom } = require('../controllers/washroomController.js');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth.js');

router.get('/admin-dashboard', isAuthenticatedUser, authorizeRoles('admin'), getAdminDashboard);
router.get('/sweeper-assignment', isAuthenticatedUser, authorizeRoles('admin'), getSweeperAssignment);
// router.get('/show-buildings', );
// router.get('/set-washrooms', isAuthenticatedUser, authorizeRoles('admin'), getWashroom);

// Route to get blocks based on the selected building
// router.get('/set-admin', isAuthenticatedUser, authorizeRoles('admin'), setAdmin);
module.exports = router;