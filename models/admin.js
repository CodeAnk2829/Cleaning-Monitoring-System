const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String, 
        required: true
    }, 
    creadate_date: {
        type: Date,
        default: Date.now
    }
});


const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;