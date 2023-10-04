const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const User = require("../models/User.js");
const bcrypt = require('bcrypt');

exports.getRegisterPage = catchAsyncErrors( async (req, res, next) => {
    const role = req.params.role;

    if(role === 'admin') {
        res.render('Admin/admin-register');
    } else if(role === 'sweeper') {
        res.render('Sweeper/sweeper-register');
    } else if(role === 'college-supervisor') {

    } else if(role === 'company-supervisor') {

    } else {
        res.status(404).json({});
    }
});

exports.getLoginPage = catchAsyncErrors( async (req, res, next) => {
    const role = req.params.role;

    if(role === 'admin') {
        res.render('Admin/admin-login');
    } else if(role === 'sweeper') {
        res.render('Sweeper/index');
    } else if(role === 'college-supervisor') {

    } else if(role === 'company-supervisor') {

    } else {
        res.status(404).json({});
    }
});

exports.registerUser = catchAsyncErrors( async (req, res, next) => {
    const { role, username, confirmPassword } = req.body;
    let password = req.body.password;
    
    if(password != confirmPassword) {
        return next(new Error(`Password didn't match`));
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    password = await bcrypt.hash(password, salt);
    const user = await User.create({ username, password, role });
    await user.save();
    sendToken(user, res);
    // res.redirect('/admin-dashboard');
    
    if(role === 'admin') {
        res.redirect('/admin-dashboard');
    } else if(role === 'sweeper') {
        res.redirect('/sweeper-dashboard');
    } else if(role === 'college-supervisor') {

    } else if(role === 'company-supervisor') {

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
            res.redirect('/sweeper-dashboard');
        } else if(role === 'college-supervisor') {

        } else if(role === 'company-supervisor') {

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
    } else if(role === 'college-supervisor') {

    } else if(role === 'company-supervisor') {

    } else {
        res.status(404).json({});
    }
    next();
});