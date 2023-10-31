const mongoose = require("mongoose");
require('dotenv').config();

const URI = process.env.MONGO_URL;
const connectDatabase = async () => {
    mongoose.set('strictQuery', true);
    await mongoose.connect(URI, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        
            // useCreateIndex:true
        }).then((data) => {
            console.log(`mongodb data is connected:${data.connection.host}`);
        }).catch((err) => {
            console.log('err.connection.database'+err.message)
        });
};

module.exports = connectDatabase;