const mongoose = require('mongoose');

const DB =process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);

const dbConnect = async() => {
    try{
        await mongoose.connect(DB)
        console.log("db connected")
    } catch(err){
        console.log(err);
    }
}

module.exports = dbConnect;