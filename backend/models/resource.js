const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {User,Profile}= require('./user.js');
const {Project}= require('./project.js');

const ResourceSchema = new Schema({
    _id:{
        type:Schema.Types.ObjectId,
        reference:Project
    },
    title:{
        type:String,
        reference:Project,
        required:true
    },
    list:[{
        title:{
            type:String,
            required:true
        },
        link:{
            type:String,
            required:true
        },
        uploadedBy:{
            type:String,
            reference:Profile.name,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now()

        }
        },
        
    ]

})
const Resource=mongoose.model('Resource',ResourceSchema);
module.exports = {
    Resource
}
