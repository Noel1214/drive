const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/drive");
        console.log("connection to dsb successfull");
    } catch (error) {
        console.log("error while trying to connect to db");
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;