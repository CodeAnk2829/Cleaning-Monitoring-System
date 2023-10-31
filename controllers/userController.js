const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const bcrypt = require('bcrypt');

const User = require("../models/User.js");
const Block = require('../models/Block');
const { setAdmin } = require("./adminController");
const { setSweeper } = require("./sweeperController");

exports.getRegisterPage = catchAsyncErrors( async (req, res, next) => {
    res.render('register');
});

exports.getLoginPage = catchAsyncErrors( async (req, res, next) => {
    const role = req.params.role;

    if(role === 'admin') {
        res.render('Admin/admin-login');
    } else if(role === 'sweeper') {
        res.render('Sweeper/index');
    } else {
        res.status(404).json({});
    }
});

exports.registerUser = catchAsyncErrors( async (req, res, next) => {
    const { name, gender, role, username, confirmPassword, building, blockName, currentAdmin } = req.body;
    let password = req.body.password;

    console.log("This is registration page");
    
    if(password != confirmPassword) {
        return next(new Error(`Password didn't match`));
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    password = await bcrypt.hash(password, salt);
    const user = await User.create({ username, password, role, name, gender });
    await user.save();
   
    if(role === 'admin') {
        sendToken(user, res);
        setAdmin(user);
        res.redirect('/register');
        // res.redirect('/admin-dashboard');
    } else if(role === 'sweeper') {
        const id = user._id;
        console.log(blockName, building);
        const block = await Block.findOne({ block_name: blockName, of_building: building });
        console.log(block);
        if(block) {
            const blockId = block._id;
            console.log(blockId);
            setSweeper({ id, username, password, name, gender, building, blockId, currentAdmin });
            res.redirect("/sweeper-assignment");
        } else {
            console.log(id);
            console.log(user._id);
            await User.deleteOne({ _id: id });
            console.log("Wrong building block mapping");
            // this error message is sent to /register route, it should be redirected on a different route
            // TODO: change route for the error
            res.send("<h1 style='color: red;'>Wrong Block. Please choose an appropriate block</h1>")
        }
    } else {
        res.status(404).json({});
    }
});

exports.loginUser = catchAsyncErrors( async (req, res, next) => {
    try {
        const { role, username, password } = req.body;
        const user = await User.login( username, password );
        sendToken(user, res);

        if(role === 'admin') {
            res.redirect('/admin-dashboard');
        } else if(role === 'sweeper') {
            const cleanerFirstName = user.name.split(" ")[0];
            res.redirect(`/cleaner?name=${cleanerFirstName}`);
        } else {
            res.status(404).json({});
        }
    } 
    catch(err) {
        console.log(err.message);
    }
});

// logout user
exports.logoutUser = catchAsyncErrors(async(req,res,next)=>{
    const role = req.params.role;
    console.log(role);
    console.log(res.locals.user);
    res.cookie("uid",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    if(role === 'admin') {
        res.redirect('/login/admin');
    } else if(role === 'sweeper') {
        res.redirect('/login/sweeper');
    } else {
        res.status(404).json({});
    }
    next();
});