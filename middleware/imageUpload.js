const path = require('path');

const upload = async (req, res, next) => {
    const imageCode = req.body.public_id;
    console.log(imageCode);
    const currentDir = __dirname;
    const imagePath = path.join(currentDir, '../public/uploads/');
    console.log(imagePath);
    if(req.files) {
        // console.log(req.files);
        const file = req.files.file;
        const filename = imageCode + '-' + file.name;
        const url = imagePath + filename;
        console.log(url);
        file.mv(url, function(err) {
            if(err) {
                return next(err);
            } else {
                req.url = url;
                next();
            }
        });
    } else {
      res.status(400).json({});
      next();
    }
}

module.exports = upload;