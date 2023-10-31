const express = require('express');
const router = express.Router();

const { getUploadPage, getWashroomsBasedOnType, populateDropdowns, setWashroom, sendWashroomDetails, washroomPost, washroomsPost } = require('../controllers/washroomController');
router.get('/getDataForBlockAndFloor', populateDropdowns);
router.get('/set-washrooms', setWashroom);
router.get('/washroom', getUploadPage);
router.get('/washrooms', getWashroomsBasedOnType);

router.post('/set-washrooms', sendWashroomDetails);
router.post('/washroom', washroomPost);
router.post('/washrooms', washroomsPost);
module.exports = router;