const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next)=>{
    const token = req.cookies.uid;
    let decodedData = null;
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                decodedData = decodedToken;
                req.user = await User.findById(decodedData.id);
                console.log('this is the req.user');
                console.log(req.user);
                next();
            }
        });
    } else {
        res.redirect('/');
        console.log(req.params);
        // console.log(req);
        return next(new ErrorHandler("Please login",401));
    }
});

// get current user
exports.getCurrentUser = (req, res, next) => {
    const token = req.cookies.uid;
    // check json web token exists & is verified

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);

                // user is accessible in views folder
                res.locals.user = user;
                console.log(user);
            }
            next();
        });
    } else {
        res.locals.user = null;
        next();
    }
}

exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
          return next(  new ErrorHandler(`Role ${req.user.role} is not allowed to accessed this resource`,403));
        }
        next();
    }
}