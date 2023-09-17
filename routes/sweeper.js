const express = require('express');
const router = express.Router();

const {sweeperController} = require('../controllers');

router.get('/sweeper-dashboard', sweeperController.ensureAuthenticated, sweeperController.getsweeperDashboard);

module.exports = router;