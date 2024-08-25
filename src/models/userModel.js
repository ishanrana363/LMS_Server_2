const mongoose = require("mongoose");
const {Schema,model} = mongoose;
const bcrypt = require('bcrypt');

const signUpSchema = new Schema({
    id : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
    },
    phone_number: {
        type: Number,
    },
    password : {
        type : String,
        required : true,
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    img : {
        type : String,
    },
    isAdmin : {
        type : Boolean,
        default : false
    }

},{timestamps:true,versionKey:false});

const userModel = model("users",signUpSchema);
module.exports = userModel;