const mongoose = require('mongoose');

const connectDB = (url) => {
    //console.log("Mongo Uri => ", url);
    return mongoose.connect(url);
};

module.exports = connectDB;