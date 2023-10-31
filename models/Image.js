const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    img_path: {
        type: String,
        required: true
    },
    floor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Floor'
    },
    washroom_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Washroom'
    },
    uploaded_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sweeper'
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