const Building = require('../models/Building');
const Block = require('../models/Block');
const Floor = require('../models/Floor');
const Admin = require('../models/Admin');

// post request when a building was selected
exports.buildingPost = async (req, res) => {
    const { buildingName, buildingId, controlledBy } = req.body;
    console.log(buildingName);
    console.log(controlledBy);
    res.redirect(`blocks?name=${buildingName}&id=${buildingId}`);
}

// list all buildings
exports.getBuildings = async (req, res) => {
    const buildings = await Building.find({});
    res.render('Building/show-buildings', { buildings });
}

exports.getBuildingDetails = async (req, res) => {
    const admins = await Admin.find({});
    res.render('Building/building-details', { admins });
}

// setting up the building 
exports.setBuildingDetails = async (req, res) => {
    const { building_name, blocks, floors, controller } = req.body;
    const controlled_by = controller; // admin name
    console.log(req.body);
    
    // save building details
    const building = await Building.create({ building_name, controlled_by });
    await building.save();

    console.log(typeof(blocks));

    const of_building = building._id;
    
    // save block details

    let count = 1;

    if(typeof(blocks) === 'string') {
        const block_name = blocks;
        const block = await Block.create({ block_name, of_building });
        await block.save();

        const of_block = block._id;

        // save details of floors
        if(typeof(floors) === 'string') {
            const floor_name = floors;
            const floor = await Floor.create({ floor_name, of_block, of_building });
            await floor.save();
        } else if(typeof(floors) === 'object') {
            floors.forEach(async (floor_name) => {
                const floor = await Floor.create({ floor_name, of_block, of_building });
                await floor.save();
            });
        }

    } else if(typeof(blocks) === 'object') {
        blocks.forEach(async (block_name) => {
            const block = await Block.create({ block_name, of_building });

            console.log(count);
            count += 1;

            await block.save();
            const of_block = block._id;

            console.log('type of floor is ' + typeof(floors));

            // save details of floors
            if(typeof(floors) === 'string') {
                const floor_name = floors;
                const floor = await Floor.create({ floor_name, of_block, of_building });
                await floor.save();
            } else if(typeof(floors) === 'object') {
                floors.forEach(async (floor_name) => {
                    const floor = await Floor.create({ floor_name, of_block, of_building });
                    await floor.save();
                });
            }

        });
    }

    
    res.redirect('/building-details');
}