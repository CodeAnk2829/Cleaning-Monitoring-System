const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Sweeper = require("../models/Sweeper");
const { assignSweeper } = require('./assignmentController');
const { getFloors } = require('./floorController');

exports.getSweeperDashboard = catchAsyncErrors(async (req, res) => {
    res.render('Sweeper/cleanerPage1');
});

exports.setSweeper = catchAsyncErrors(async (user) => {
    console.log('This is setSweeper controller');
    const sweeper = await Sweeper.create({
        username: user.id,
        name: user.name,
        gender: user.gender,
        works_at: user.building,
        is_assigned_in: user.blockId
    });
    await sweeper.save();
    user["s_id"] = sweeper._id;
    // assign the sweeper in the assignment model as well
    assignSweeper(user);
});

exports.getCleanerPage = catchAsyncErrors(async (req, res) => {
    console.log('This is getCleaner page');
    const currentCleaner = req.user; // fetch the current cleaner
    console.log(currentCleaner);
    const floors = await getFloors(currentCleaner); // fetch the floors
    res.render('Floor/floors', { floors });
});