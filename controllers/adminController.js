const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Admin = require('../models/Admin');
const Building = require('../models/Building');
const Block = require('../models/Block');


exports.getAdminDashboard = async (req, res) => {
    res.render('Admin/admin-dashboard');
}

exports.getSweeperAssignment = async (req, res) => {
    try {
        const buildings = await Building.find({});
        // let blockArray = [];
        const currentAdmin = req.user;
        // Use Promise.all to wait for all the Block.find promises to complete
        // const blockPromises = buildings.map(async (building) => {
        //     const building_id = building._id;
        //     const blocks = await Block.find({ of_building: building_id });
        //     return blocks;
        // });

        // blockArray = await Promise.all(blockPromises);

        
        res.render('Admin/sweeper-assignment', { buildings, currentAdmin });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

exports.setAdmin = async (user) => {
    console.log('This is setAdmin controller');
    const admin = await Admin.create({
        username: user._id,
        name: user.name,
        gender: user.gender
    });
    await admin.save();
}