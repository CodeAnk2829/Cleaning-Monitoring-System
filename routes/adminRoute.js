const express = require('express');
const router = express.Router();
const { getAdminDashboard } = require('../controllers/adminController.js');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth.js');

router.get('/admin-dashboard', isAuthenticatedUser, authorizeRoles('admin'), getAdminDashboard);

module.exports = router;