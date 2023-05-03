const{Project} =require('../models/project')
const{Profile}= require('../models/user')
const{Discussion}= require('../models/discussion')
const{Assignment}= require('../models/todo')
const shortid = require('shortid');
const nodemailer=require('nodemailer');
const{parser}=require('../app');
const{getuserid,ismember,iscreater} = require('../middleware/auth.js');
const { create } = require('tar');
const Mongoose = require('mongoose');


const CreateAssignment= async(req,res)=>{
    const{tag,label,title,point,detail,deadline,assignedto}=req.body
    const userid = getuserid(req,res)
    const {projectid}=req.params
    
    try{
        //Checking if assignment document with given id exists
        const todo= await Assignment.findOne({_id:projectid})
        const project= await Project.findOne({_id:projectid,"createdby._id":userid})
        if(!tag || !label|| !title|| !detail|| !deadline){
            throw Error("Fill all the fields")
        }
        if(!project){
            throw Error("There is no such project of which you  are manager")
        }
        else{
            const User=await Profile.findOne({_id:assignedto})
            const createtask= await Assignment.findOneAndUpdate(
                {'_id':projectid},
                {$push:{
                    list:{
                        tag:tag,
                        label:label,
                        title:title,
                        point:point,
                        detail:detail,
                        deadline:deadline,
                        "assignedto._id":assignedto,
                        "assignedto.name":User.name
                    }
                }},
                {new:true}
            )
            res.status(200).json(createtask)
            }
    }
    catch(error){
        res.status(404).json({error:error.message})
    }
}


const UpdateAssignment= async(req,res)=>{
    const{tag,label,title,point,detail,deadline,assignedto}=req.body
    const {projectid,todoid}=req.params
    const userid = getuserid(req,res)
    console.log(todoid)
    try{
        //Checking if assignment document with given id exists
        const project= await Project.findOne({_id:projectid,"members._id":userid})
        // Checking if such project exists
        if(!project){
            throw Error("You are not member of the project")
        }else{
            // if project exists checking if the current user  the creater
            const iscreater= await Project.findOne({"_id":projectid,"createdby._id":userid})
            if(iscreater){
                // if current user  is creater enabling him to upadate everything
                const checktodo= await Assignment.findOne({"_id":projectid,"list._id":todoid})
                // checking if  provided todop exists
                if(!checktodo){
                    throw Error("No such todo exist belonging to you")
                }
                else{
                    console.log(1)
                    const User=await Profile.findOne({_id:userid})
                    const updatetodo= await Assignment.findOneAndUpdate(
                        {"list._id":todoid},
                        {$set:{
                           /* use list.$.field option else 
                           if you use like with push of set:{list:{field}}
                           it will update the list with single updated object
                           */
                                "list.$.tag":tag,
                                "list.$.label":label,
                                "list.$.title":title,
                                "list.$.point":point,
                                "list.$.detail":detail,
                                "list.$.deadline":deadline,
                                "list.$.assignedto._id":assignedto,
                                "list.$assignedto.name":User.name
                            }
                        },
                        {new:true}
                    )
                    console.log()
                    res.status(200).send(updatetodo)
                }
            }
            else{
                const checktodo= await Assignment.findOne({"_id":projectid,"list._id":todoid,"list.assignedto":userid})
                // checking if  provided todop exists
                if(!checktodo){
                    throw Error("No such todo exists assigned to you")
                }
                else{
                    const todo = await Assignment.findOneAndUpdate(
                        {"list._id":todoid},
                        {$set:{
                           /* use list.$.field option else 
                           if you use like with push of set:{list:{field}}
                           it will update the list with single updated object
                           only lettig assigned person not creater to update tag
                           */
                                "list.$.tag":tag,
                            }
                        },
                        {new:true}
                    )
                    console.log(2)
                    res.status(200).send(todo)
                    }
                }  
            }
    }
    catch(error){
        res.status(404).json({error:error.message})
    }
}


const ProjectProgress=async (req, res)=>{
    let {projectid} = req.params
    projectid = new Mongoose.Types.ObjectId(projectid)
    console.log(projectid)
    try{
         // aggregation pipelin for each member
            const totalpointdata =  await Assignment.aggregate([
                    {$match:{_id:projectid}},
                    {$unwind:"$list"},
                    {
                        $group:{
                            _id:"$list.assignedto.name",
                            totalPoints:{$sum:"$list.point"},
                            completedPoints: { $sum: { $cond: [{ $eq: ["$list.tag", "Completed"] }, "$list.point", 0] } }  
                        }  
                    },
            ])

        res.status(200).json(totalpointdata)
    }
    catch(error)
    {
        res.status(404).json({error:error.message})
    }
}

const UserProgress=async(req,res)=>{
    userid=getuserid(req,res);
    try{
        const totalpointdata=await Assignment.aggregate([
            {$unwind:"$list"},
            {$match:{"list.$.assignedto":userid}},
            // {
            //     $group:{
            //         _id:"_id",
            //         totalPoints:{$sum:"list.point"},
            //         completedPoints:{$sum: { $cond: [{ $eq: ["$list.tag", "Complete"] }, "$list.point", 0] } }
            //     }
            // }
        ])
            res.status(200).json(totalpointdata)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}


const ViewAssignment=async(req,res)=>{
    const {projectid}=req.params
    const userid = getuserid(req,res)
    try{
         //Checking if assignment document with given id exists
         const project= await Project.findOne({_id:projectid,"members._id":userid})
         // Checking if such project exists
         if(!project){
             throw Error("You are not member of the project")
         }else{
             // if project exists checking if the current user  the creater
             const todolist= await Assignment.find({"_id":projectid})
             res.status(200).json(todolist)
        }
        }catch(error)
        {
            res.status(404).json({error:error.message})
        }
}



const ViewSelfAssignment=async(req,res)=>{
    const {projectid}=req.params
    const userid = getuserid(req,res)
    try{
         //Checking if assignment document with given id exists
         const project= await Project.findOne({_id:projectid,"members._id":userid})
         // Checking if such project exists
         if(!project){
             throw Error("You are not member of the project")
         }else{
             // if project exists checking if the current user  the creater
             const todolist= await Assignment.find({"_id":projectid,"list.assignedto._id":userid},{"list.title":1,"list.deadline":1})
             res.status(200).json(todolist)
        }
        }catch(error)
        {
            res.status(404).json({error:error.message})
        }
}
module.exports={
    CreateAssignment,
    UpdateAssignment,
    ProjectProgress,
    UserProgress,
    ViewAssignment,
    ViewSelfAssignment
}