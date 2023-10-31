const mongoose = require('mongoose');

const floorSchema = new mongoose.Schema({
    floor_name: {
        type: String,
        required: true
    },
    of_block: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Block'
    },
    of_building: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building'
    }
});

const Floor = mongoose.model('Floor', floorSchema);
module.exports = Floor;