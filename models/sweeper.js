const mongoose = require('mongoose');

const sweeperSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    works_at: { // building
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building'
    },
    is_assigned_in: { // block
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Block'
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const Sweeper = mongoose.model('Sweeper', sweeperSchema);
module.exports = Sweeper;