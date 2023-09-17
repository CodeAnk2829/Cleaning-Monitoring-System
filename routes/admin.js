const express = require('express');
const router = express.Router();

const {adminController} = require('../controllers');


// router.get('/Admin-login', adminController.getAdminLogin);
router.get('/Admin-dashboard', adminController.ensureAuthenticated, adminController.getAdminDashboard);

module.exports = router;