const Building = require('../models/Building');
const Block = require('../models/Block');
const Floor = require('../models/Floor');
const Washroom = require('../models/Washroom');

exports.getUploadPage = async (req, res) => {
    console.log(req.query);
    const { floor, id, type, washroomId, washroomName } = req.query;
    res.render('Sweeper/uploadImages', { floor, id, type, washroomId, washroomName });
}

exports.getWashroomsBasedOnType = async (req, res) => {
    console.log(req.query);
    const { floor, id, type } = req.query;
    const washrooms = await Washroom.find({ of_floor: id, for: type });
    res.render('Washroom/washrooms', { washrooms, type, floor, id });
}

exports.populateDropdowns = async (req, res) => {
    const { type, parentId } = req.query;
    if(type === 'block') {
        // find blocks based on the selected building
        const blocks = await Block.find({ of_building: parentId });   
        res.json(blocks);
    } else if(type === 'floor') {
        // find floors based on the selected block
        const floors = await Floor.find({ of_block: parentId});
        res.json(floors);
    }
} 

exports.setWashroom = async (req, res) => {
    const buildings = await Building.find({});
    res.render('Washroom/setWashrooms', { buildings });
}

exports.sendWashroomDetails = async (req, res) => {
    const { building, block, floor, maleWashroom, femaleWashroom } = req.body;
    for(let i = 1; i <= maleWashroom; ++i) {
        const washroom = await Washroom.create({
            t_name: "T-" + i,
            for: "male",
            of_floor: floor,
            of_block: block,
            of_building: building
        });
        await washroom.save();  
    }
    for(let i = 1; i <= femaleWashroom; ++i) {
        const washroom = await Washroom.create({
            t_name: "T-" + i,
            for: "female",
            of_floor: floor,
            of_block: block,
            of_building: building
        });
        await washroom.save();  
    }
    res.redirect('/washrooms');
}

exports.washroomPost = async (req, res) => {
    const { washroomName, floor, id, type, washroomId } = req.body; // from Washroom/washrooms
    res.redirect(`/washroom?floor=${floor}&id=${id}&type=${type}&washroomName=${washroomName}&washroomId=${washroomId}`);
}

exports.washroomsPost = async (req, res) => {
    const { floorId, type } = req.body; // from Washroom/washroomTypes
    console.log(floorId);
    const floor = await Floor.findOne({ _id: floorId });
    const floorName = floor.floor_name;
    console.log(type);
    res.redirect(`/washrooms?floor=${floorName}&id=${floorId}&type=${type}`);
}