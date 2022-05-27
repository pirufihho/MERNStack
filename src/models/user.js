const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true},
    password:{type:String,required:false},
    adminUser:{type:Boolean,required:true}
})

module.exports = mongoose.model('User',UserSchema);