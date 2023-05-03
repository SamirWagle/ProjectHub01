const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {User,Profile}= require('../models/user.js');
const {Project}= require('../models/project.js');


const DiscussionSchema =new Schema({
    // _id is the id of the project
    _id:{
        type:Schema.Types.ObjectId,
        reference:Project,
        required:true
    },
    title:{
        type:String,
        reference:Project,
        required:true
    },
    message:[
        {
            name:{
                type:String,
                reference:Profile,
                required:true
            },
            detail:{
                type:String,
                required:true
            },
            createdAt:{
                type: Date, 
                default: Date.now 
            }
        }
    ]  
})
const Discussion=mongoose.model('Discussion',DiscussionSchema);
module.exports = {
    Discussion
}