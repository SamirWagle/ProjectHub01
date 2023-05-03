const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const UserRegistration= new Schema({
    email:{
        type:"string",
        required: true,
        unique: true,
        length:50
    },
    password:{
        type:"string",
        required: true,
        length:20
    }
})



// Creating a user profile schema
const UserProfile= new Schema({
    _id:{
        type:Schema.Types.ObjectId,
        reference:UserRegistration
    },
    email:{
        type:String,
        ref:'UserRegistration'//here both collection have same field name so referencing to just the collection is enough
    },
    name:{
        type:String,
        required: true,
        length:50
    },
    gender: {
        type: String, 
        enum: ["Male", "Female","Non-Binary"]
    },
    phonenumber: {
        type:String,
        required: true
    },
    gitlink:{
        type:String,
        length:100,
        required: true
    },
    dob:{
        type:Date,
    }
})

const User= mongoose.model('User',UserRegistration);
const Profile=mongoose.model('Profile',UserProfile);

module.exports = {
    User,
    Profile
};