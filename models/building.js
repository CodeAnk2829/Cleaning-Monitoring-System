const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
    building_name: {
        type: String,
        required: true
    }, 
    controlled_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
});

const Building = mongoose.model('Building', buildingSchema);
module.exports = Building;