const{Project} =require('../models/project')
const{Profile}= require('../models/user')
const{Discussion}= require('../models/discussion')
const{getuserid,ismember,iscreater} = require('../middleware/auth.js');
const { get } = require('http');
const { Resource } = require('../models/resource');


const CreateResource= async (req,res)=>{
    const{title,link}=req.body
    const{projectid}=req.params
    const userid=getuserid(req,res)
    
    try{
        const resource=await Resource.findOne({_id:projectid})
        if(!resource){
            throw Error("Project with given id doesn't exist")
        }
        else{
            const membercheck= await Project.findOne({"_id":projectid,"members._id":userid})
            const user=await Profile.findOne({_id:userid})
            if(!membercheck){
                throw Error("You are not a member of this project")
            }else{
                console.log(2)
                const createresource=await Resource.findOneAndUpdate(
                    {'_id':projectid},
                    {$push:{
                        list:{
                            uploadedBy:user.name,
                            title:title,
                            link:link,
                           
                        }
                        }
                    },
                    {new:true}
                )
                res.status(200).json({message:"Successfully uploaded resource"})
            }
       
        }
    }
    catch(error){
        res.status(404).json({error:error.message})
    }
}



const ViewResource=async (req, res) => {
    const{projectid}=req.params
    const userid=getuserid(req, res)
    try{
        const resource=await Resource.findOne({_id:projectid})
        if(!resource){
            throw Error("Project with given id doesn't exist")
        }
        else{
            const membercheck= await Project.findOne({"_id":projectid,"members._id":userid})
            const user=await Profile.findOne({_id:userid})
            if(!membercheck){
                throw Error("You are not a member of this project")
            }else{
            /* aggregation pipline functions called $unwind and
            and $poject to get just the necessary document
            $unwind creates seperate document for each  element in array
            $project creates document with just name ,details and createdAt
            Reminder again with aggregation we needd $ before fieldname
            */
            const list= await Resource.aggregate([
                {$unwind:"$list"}, 
                {$project:{
                    _id:0,
                    title:"$list.name",
                    link:"$list.detail",
                    uploadedBy:"$list.uploadedby",
                    createdAt:"$list.createdAt"
                    }
                },
                {$sort:{createdAt:-1}}
            ])
            console.log(2)
            console.log(list)
            res.status(200).json(list)
            }
        }   
    }catch(error){
        res.status(400).json({error:error.message})
    }

}

module.exports={
    CreateResource,
    ViewResource
}