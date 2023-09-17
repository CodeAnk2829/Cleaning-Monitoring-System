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
    s_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sweeper'
    },
    assigned_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    assign_date: {
        type: String,
        default: () => new Date().toLocaleDateString()
    },
    assign_time: {
        type: String,
        default: () => new Date().toLocaleTimeString()
    }
});


const Assignment = mongoose.model('Assignment', assginmentSchema);
module.exports = Assignment;