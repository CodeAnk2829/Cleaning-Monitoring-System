const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, "Please enter you name"]
    },
    gender: {
        type: String, 
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});


const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;