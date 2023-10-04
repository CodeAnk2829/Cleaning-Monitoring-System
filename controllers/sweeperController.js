const catchAsyncError = require('../middleware/catchAsyncErrors');
exports.getSweeperDashboard = catchAsyncError(async (req, res) => {
    res.render('Sweeper/sweeper-dashboard');
});

exports.uploadImage = catchAsyncError(async (req, res, next) => {
    const url = req.url;
    console.log(url);
});