const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    img_path: {
        type: String,
        required: true
    },
    building_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building'
    },
    block_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Block'
    },
    floor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Floor'
    },
    toilet_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Toilet'
    },
    uploaded_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    upload_date: {
        type: String,
        default: () => new Date().toLocaleDateString()
    },
    upload_time: {
        type: String,
        default: () => new Date().toLocaleTimeString()
    }
});

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;