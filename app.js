const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');


const port = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(session({
    secret: "The secret of profile.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Establish connection
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/TMSdatabase');

const Admin = require('./models/Admin');
const Sweeper = require('./models/Sweeper');

const {authRoute, adminRoute, sweeperRoute} = require('./routes');


// const admin1 = new Admin({
//     username: 7779833918,
//     password: 12345,
//     name: 'Bholanath Roy',
//     gender: 'M'
// });
// admin1.save();

// const sweeper1 = new Sweeper({
//     username: 7777777777,
//     password: 12345,
//     s_name: 'Vikram',
//     gender: 'M',
//     rating: 4
// });
// sweeper1.save();


app.use('/', authRoute);
app.use('/', adminRoute);
app.use('/', sweeperRoute);


app.listen(port, () => console.log(`Server is running on port ${port}`));