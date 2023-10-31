const express = require('express');
const router = express.Router();
const { getCorrespondingFloors, getFloorPage, floorPost } = require('../controllers/floorController');

router.get('/floor', getFloorPage);
// router.get('/floors', getCorrespondingFloors); // get floors based on the selected blocks

router.post('/floor', floorPost);

module.exports = router;