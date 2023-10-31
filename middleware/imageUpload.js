const path = require('path');
const sharp = require('sharp');

const upload = async (req, res, next) => {
    const imageCode = Date.now();
    const currentDir = __dirname;
    const imagePath = path.join(currentDir, '../public/uploads/');

    if (req.files) {
        const files = req.files.washroomImg;
        const promises = [];

        const uploadedFiles = [];

        files.forEach(file => {
            const filename = imageCode + '-' + file.name;
            const url = imagePath + filename;

            promises.push(
                new Promise((resolve, reject) => {
                    file.mv(url, function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            // Process the image using sharp
                            sharp(url)
                                .rotate() // Rotate if needed
                                .resize(1024) // Resize to a maximum of 1024px
                                .jpeg({ mozjpeg: true }) // Compress using MozJPEG
                                .toBuffer()
                                .then(data => {
                                    // Save the processed image back to the URL
                                    sharp(data).toFile(url, (err, info) => {
                                        if (err) {
                                            reject(err);
                                        } else {
                                            uploadedFiles.push({ filename, imagePath: url }); // Store filename and imagePath
                                            resolve(info);
                                        }
                                    });
                                })
                                .catch(err => {
                                    reject(err);
                                });
                        }
                    });
                })
            );
        });

        Promise.all(promises)
            .then(results => {
                req.url = uploadedFiles; // Set req.url to the array of uploaded files
                next();
            })
            .catch(err => {
                return next(err);
            });
    } else {
        res.status(400).json({});
        next();
    }
};

module.exports = upload;
