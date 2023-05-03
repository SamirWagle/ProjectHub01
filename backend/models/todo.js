const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {User,Profile}= require('./user.js');
const {Project}= require('./project.js');

const AssignmentSchema= new Schema({
    _id:{
        type:Schema.Types.ObjectId,
        reference:Project
    },
    title:{
        type:String,
        reference:Project
    },
    list:[{
        tag:{
            type: 'string',
            enum:["ToDo","BackLog","InProgress","Review","Completed"],
            required: true
        },
        label:{
            type:"String",
        },
        title:{
            type:"String",
            required:true
        },
        point:{
            type:Number,
            required:true
        },
        detail:{
            type:"String",
            required:true
        },
        assignedto:{
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
            type:"Date",
            required:true
        },
        completedon:{
            type:"Date",
            default:null
        },
        completedflag:{
            type:"Boolean",
            required:true,
            default:false
        }
    }]
})    

const Assignment=mongoose.model("Assignment",AssignmentSchema)

module.exports={
    Assignment
}