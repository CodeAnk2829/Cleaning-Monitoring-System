const Floor = require('../models/Floor');
const Sweeper = require('../models/Sweeper');
const Washroom = require('../models/Washroom');

const catchAsyncErrors = require('../middleware/catchAsyncErrors');

exports.floorPost = async (req, res) => {
    const { floorName, floorId } = req.body;
    console.log(floorName);
    res.redirect(`/floor?name=${floorName}&id=${floorId}`);
}

// get floors based on the blocks
exports.getCorrespondingFloors = async (req, res) => {
    const blockDetails = req.query
    console.log(blockDetails);
    const floors = await Floor.find({ of_block: blockDetails.id });
    console.log(floors);
    res.render('Floor/floors', { floors });
}

// fetch the floors based on the cleaner who is working in that particular department and the particular block
exports.getFloors = async (user) => {
    console.log('This is getFloors');
    const sweeper = await Sweeper.findOne({ username: user._id });
    const works_at = sweeper.works_at; // building
    const isAssignedIn = sweeper.is_assigned_in; // block
    const floors = await Floor.find({ of_building: works_at, of_block: isAssignedIn });
    return floors;
};

exports.getFloorPage = async (req, res) => {
    const { name, id } = req.query;
    console.log(name);
    const washrooms = await Washroom.find({ of_floor: id });

    res.render('Washroom/washroomTypes', { floorId: id });
}