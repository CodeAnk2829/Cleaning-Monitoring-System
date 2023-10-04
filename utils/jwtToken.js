require('dotenv').config()
const User = require('../models/User.js');

const sendToken = (user, res)=>{
    console.log(user);
    const token = user.getJWTToken(user._id);
    console.log(token);
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:true,
    };
    res.cookie('uid', token, options);
};

module.exports = sendToken;