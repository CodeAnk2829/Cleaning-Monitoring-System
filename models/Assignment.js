const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    building_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building'
    },
    block_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Block'
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sweeper'
    },
    assigned_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    assign_date: {
        type: Date,
        default: Date.now
    }
});


const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;