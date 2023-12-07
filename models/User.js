const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
         require:true,
         trim:true,
    },
    email:{
        type:String,
         require:true,
         trim:true,
    },
    password:{
        type:String,
         require:true,
         
    }
})

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema);