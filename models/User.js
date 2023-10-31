require('dotenv').config();
const mongoose = require('mongoose');
const { isMobilePhone } = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: [true, 'Username required'],
        unique: true,
        minLength: 10,
        maxLength: 10,
        validate: [isMobilePhone, 'en-IN', 'Please enter a valid mobile number']
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        minLength: [5, 'Minimum password length is 5 characters']
    },
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    gender: {
        type: String,
        required: [true, 'Gender information needed']
    },
    role: {
        type: String,
        enum: ['admin', 'sweeper'],
        default: 'sweeper'
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});



// method for jwt signature
userSchema.methods.getJWTToken = function (id) {
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE*24*60*60,
    });
};

// static method to login user
userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username });
    if(user) {
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        console.log(isPasswordMatched);
        if(isPasswordMatched) {
            console.log('password matched');
            return user;
        }
        throw Error('Invalid username or password');
    }
    throw Error('Incorrect username or password');
}

const User = mongoose.model('User', userSchema);

module.exports = User;