const mongoose = require('mongoose');

const washroomSchema = new mongoose.Schema({
    t_name: {
        type: String,
        required: true
    },
    for: { // male washroom or female washroom
        type: String,
        required: true
    },
    of_floor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Floor'
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

const Washroom = mongoose.model('Washroom', washroomSchema);
module.exports = Washroom;