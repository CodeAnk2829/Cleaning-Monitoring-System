const express = require('express');
const router = express.Router();

const { blockPost, getBlocks, getCorrespondingBlocks, populateBlocks } = require('../controllers/blockController');
const { isAuthenticatedUser } = require('../middleware/auth');

router.get('/blocks', getCorrespondingBlocks);
router.get('/getBlocks', getBlocks);
router.get('/populateBlocks', populateBlocks);
router.post('/block', blockPost);

module.exports = router;