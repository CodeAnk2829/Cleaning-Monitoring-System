require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');


const port = process.env.PORT || 3000;
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

// import database
const connectDatabase = require('./config/db.js');
connectDatabase();

const Admin = require('./models/Admin');
const Sweeper = require('./models/Sweeper');

// get current user
const {getCurrentUser} = require('./middleware/auth.js');
const authRoute = require('./routes/authRoute.js');
const adminRoute = require('./routes/adminRoute.js');
const sweeperRoute = require('./routes/sweeperRoute.js');

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

app.get('*', getCurrentUser);
app.use('/', authRoute);
app.use('/', adminRoute);
app.use('/', sweeperRoute);


app.listen(port, () => console.log(`Server is running on port ${port}`));