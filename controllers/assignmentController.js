const Assignment = require('../models/Assignment');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

exports.assignSweeper = catchAsyncErrors( async (user) => {
    console.log('This is assignment');
    // console.log(user);
    const assignment = await Assignment.create({
        building_id: user.building,
        block_id: user.blockId,
        assignee: user.s_id,
        assigned_by: user.currentAdmin
    });
    await assignment.save();
});