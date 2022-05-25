const mongoose = require('mongoose');

const {Schema} = mongoose;

const CabaniaSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    imgURI:{type:String,required:false},
    mail:{type:String,required:false},
    phone:{type:String,required:false},
    province:{type:String,required:false},
    city:{type:String,required:false}
})

module.exports = mongoose.model('Cabania',CabaniaSchema);