const mongoose = require('mongoose');

const sweeperSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    s_name: {
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
        max: 5
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const Sweeper = mongoose.model('Sweeper', sweeperSchema);
module.exports = Sweeper;