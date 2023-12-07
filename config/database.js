const mongoose = require('mongoose');
require('dotenv').config();

exports.connect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{console.log("DataBase Connected Succesfuly")})
    .catch((err)=>{
        console.log("DataBase Connection Issue");
        console.error(err);
        process.exit(1);
    })
}