import mongoose, { SchemaType } from "mongoose";
const sweeperSchema = new mongoose.Schema({
    s_name: {
        type: String,
        required: true
    },
    s_mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    building_assigned: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building'
    },
    block_assigned: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Block'
    },
    assigned_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
});

module.exports = mongoose.model('Sweeper', sweeperSchema);