import mongoose from "mongoose";

const buildingSchema = new mongoose.Schema({
    building_name: {
        type: String,
        required: true
    }, 
    controlled_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
});

module.exports = mongoose.model('Building', buildingSchema);