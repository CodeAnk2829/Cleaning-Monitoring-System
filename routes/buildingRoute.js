const Building = require('../models/Building');
const express = require('express');
const router = express.Router();
const { buildingPost, getBuildings, getBuildingDetails, setBuildingDetails } = require('../controllers/buildingController.js');

router.get('/building-details', getBuildingDetails);
router.get('/buildings', getBuildings);

router.post('/building', buildingPost);
router.post('/building-details', setBuildingDetails);


module.exports = router;