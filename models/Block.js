const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
    block_name: {
        type: String,
        required: true
    },
    of_building: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building'
    }
});

const Block = mongoose.model('Block', blockSchema);
module.exports = Block;