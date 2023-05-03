const {User,Profile}=require("../models/user.js");
const bcrypt= require("bcrypt")
const validator=require("validator")
const jwt =require("jsonwebtoken")
const {ReqAuth,getuserid} = require("../middleware/auth.js")

const CreateProfile= async(req, res) => {
    console.log(1)
    const {name,gender,phonenumber,dob,gitlink}= req.body 
  
    try{
        //getting id of session user from getid function of middleware
        const _id = getuserid(req,res)
        
        //finding user with given id
        const user = await User.findOne({_id});

        if(!name || !phonenumber || !gitlink){
            throw Error("You must provide a firstname,phonenumber and gitlink compulsarily")
        }

        const profileexists= await Profile.findOne({_id})//use findone to give null value if only find is used we get null array difficult to use with if
        if(profileexists){
            throw Error("Profile already exists");
        }
        
        //CREATING new profile using user found with session id 
        const createprofile= await Profile.create({
            _id:user._id,
            email:user.email,
            name:name,
            gender:gender,
            phonenumber:phonenumber,
            dob:dob,
            gitlink:gitlink
        })
    res.status(200).json(createprofile)
    }catch(error){
        console.log(1)
        res.status(404).json({error:error.message})
    }
}

const UpdateProfile = async(req,res)=>{
    const {name,gender,phonenumber,dob,gitlink}= req.body 
    try{
        //getting id of session user from getid function of middleware
        const _id = getuserid(req,res)
        
        //finding profile with given id
        const upadateprofile = await Profile.findOneAndUpdate({_id:_id},req.body);
        const newprofile = await Profile.findOne({_id:_id})
        res.status(200).json(newprofile)
    }catch(error)
    {
        res.status(404).json({error:error.message})
    }
}

const GetNamebyId=async (req, res) =>{
        const {userid}=req.params;
        try{
            console.log(userid)

            const User=await Profile.findOne({_id:userid});
            const name=User.name
            console.log(name)
            res.status(200).json({name:name})
            
        }
        catch(error)
        {
            console.log("erro")
            res.status(404).json({error:error.message})
        }
    }
    const GetNamebyToken=async (req, res) =>{
        const userid=getuserid(req,res);
        try{
            const User=await Profile.findOne({_id:userid});
            let name=User.name
            res.status(200).json({name:name})
        }
        catch(error)
        {
            res.status(404).json({error:error.message})
        }
    }  
module.exports ={CreateProfile,UpdateProfile,GetNamebyId,GetNamebyToken};