const Block = require('../models/Block');
const Floor = require('../models/Floor');

// post request sent to floors route when block was selected
exports.blockPost = async (req, res) => {
    const { blockName, blockId } = req.body;
    console.log(blockName);
    res.redirect(`floors?name=${blockName}&id=${blockId}`);
}

exports.getBlocks = async (req, res, next) => {
    const selectedBuilding = req.query.building;
    console.log(selectedBuilding);
    const blocks = await Block.find({ of_building: selectedBuilding });
    res.json({blocks});
    
    next();
}

// get corresponding blocks based on the selected building
exports.getCorrespondingBlocks = async (req, res) => {
    const buildingDetails = req.query
    console.log(buildingDetails);
    const blocks = await Block.find({ of_building: buildingDetails.id });
    console.log(blocks);
    res.render('Block/show-blocks', { blocks });
}

// populate block dropdown at runtime when building was selected
exports.populateBlocks = async (req, res) => {
    const { parentId } = req.query;
    const blocks = await Block.find({ of_building: parentId });
    console.log(blocks);
    res.json(blocks);
}