const mongoose = require('mongoose');
const phoneSchema = new mongoose.Schema({
    phonename:{
        type:String,
         require:true,
         trim:true,
    },
    price:{
        type:String,
         require:true,
         
    },
    isLatest:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("Phone",phoneSchema);