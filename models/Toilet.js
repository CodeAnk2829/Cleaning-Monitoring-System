const mongoose = require('mongoose');

const toiletSchema = new mongoose.Schema({
    t_name: {
        type: String,
        required: true
    },
    floor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Floor'
    },
    block_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Block'
    },
    building_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building'
    },
    for: { // male toilet or female toilet
        type: String,
        required: true
    }
});

const Toilet = mongoose.model('Toilet', toiletSchema);
module.exports = Toilet;