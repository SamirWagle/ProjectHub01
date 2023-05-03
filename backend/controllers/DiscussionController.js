const{Project} =require('../models/project')
const{Profile}= require('../models/user')
const{Discussion}= require('../models/discussion')
const shortid = require('shortid');
const{getuserid,ismember,iscreater} = require('../middleware/auth.js');
const { default: mongoose } = require('mongoose');

const SendMessage= async(req, res) => {
    const{message}=req.body
    const{projectid}=req.params
    const userid=getuserid(req, res)
    try{
        const chat=await Discussion.findOne({_id:projectid})
        // Checking if there is project chat exists
        if(!chat){
            throw Error("Project with given id does not exist")
        }
        const user=await Profile.findOne({_id:userid})
        const membercheck= await Project.findOne({"_id":projectid,"members._id":userid})
        if(membercheck==false){
            throw Error("You are not a member of this project")
        }else{
            const createchat=await Discussion.findOneAndUpdate(
                {'_id':projectid},
                {$push:{
                    message:{
                        name:user.name,
                        detail:message,
                    }
                    }
                },
                {new:true}
            )
            res.status(200).json({message:"Successfully Send the message"})
        }
   
    }
    catch(error){
        res.status(404).json({error:error.message})
    }
}

const SeeMessage=async (req, res) => {
    const{projectid}=req.params
    const userid=getuserid(req, res)
    try{
        const chat=await Discussion.findOne({_id:projectid})
        // Checking if there is project chat exists
        if(!chat){
            throw Error("Project with given id does not exist")
        }
        const user=await Profile.findOne({_id:userid})
        const membercheck=await Project.findOne({"_id":projectid,"members._id":userid})
        if(!membercheck){
            throw Error("You are not a member of this project")
        }else{
            /* aggregation pipline functions called $unwind and
            and $poject to get just the necessary document
            $unwind creates seperate document for each  element in array
            $project creates document with just name ,details and createdAt

            Reminder again with aggregation we needd $ before fieldname
            */

            const list= await Discussion.aggregate([
                {$unwind:"$message"}, 
                {$project:{
                    _id:0,
                    name:"$message.name",
                    detail:"$message.detail",
                    createdAt:"$message.createdAt"
                    }
                },
                {$sort:{createdAt:-1}}
            ])
            res.status(200).json(list)
            }
        }catch(error){
        res.status(400).json({error:error.message})
    }

}

module.exports={
    SendMessage,
    SeeMessage
}