const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {User,Profile}= require('../models/user.js');

const ProjectSchema = new Schema({
    title:{
        type :String,
        required : true,
        length:520
    },
    details:String,
    code:{
        type:String,
        required : true,
        unique : true,
    },
    createdby:{
        _id:{
        type:Schema.Types.ObjectId,
        reference:Profile,
        required:true
        },
        name:{
            type:String,
            reference:Profile,
            required:true
        }
    },
    deadline:{
        type:Date,
        default:null,
    },
    members:[
        {
            _id:{
            type:Schema.Types.ObjectId,
            reference:Profile
            },
            name:{
                type:String,
                reference:Profile
            },
            designation:{
                type:String,
                default:" ",
                length:20
            },
    }],
    completedflag:{
        type:"Boolean",
        required:true,
        default:false
    },
})


const Project=mongoose.model('Project',ProjectSchema)

module.exports={
    Project
}