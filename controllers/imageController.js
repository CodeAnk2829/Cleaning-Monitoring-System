const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Image = require('../models/Image');
const Sweeper = require('../models/Sweeper');

exports.uploadImage = catchAsyncErrors(async (req, res, next) => {
    const url = req.url;
    const getCurrentUser = req.user;

    // find the sweeper who is uploading the image
    const getCurrentSweeper = await Sweeper.findOne({ username: getCurrentUser._id });
    
    const { floor, id, type, washroomId, washroomName } = req.body;
    console.log("this is uploadImage/sweeperController");
    console.log(url);
    url.forEach(async (files) => {
        const image = await Image.create({
            filename: files.filename,
            img_path: files.imagePath,
            floor_id: id,
            washroom_id: washroomId,
            uploaded_by: getCurrentSweeper._id,
        });
        await image.save();
    });
    res.send('uploaded successfully');
});
