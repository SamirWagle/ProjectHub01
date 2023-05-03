const{Project} =require('../models/project')
const{Profile}= require('../models/user')
const{Discussion}= require('../models/discussion')
const{Assignment}=require('../models/todo.js')
const shortid = require('shortid');
const nodemailer=require('nodemailer');
const{parser}=require('../app');
const{getuserid,ismember,iscreater} = require('../middleware/auth.js')


const CreateProject= async (req,res)=>{
    const{title,details,deadline}=req.body
    try{
        const _id=getuserid(req,res)
        
        // checking the title name of the project is unique or not
        const project=await Project.findOne({title})
        if(project){
            throw Error("Project with same name exists already")
        }

        //LOOP TO keep generating project code till unique
           // Generate a 6-character alphanumeric code
           while(true){ 
           var projectcode = shortid.generate();
           const projectcheck= await Project.findOne({code:projectcode});
            if(!projectcheck){break;}
           }

        const user=await Profile.findOne({_id:_id})
        
        const createProject=await Project.create({
            title:title,
            details:details,
            deadline:deadline,
            createdby:{_id:_id,name:user.name},
            code:projectcode,
            members:[{_id:_id,name:user.name}]
        })
        

        const createDiscussion= await Discussion.create({
            "_id":createProject._id,
            "title":createProject.title
        })

        const createAssignment= await Assignment.create({
            "_id":createProject._id,
            "title":createProject.title
        })
console.log(createProject)
        res.status(200).json(createProject)

    }catch(error){
        res.status(404).json({error: error.message})
    }
}



//function to view project details
const ViewProject = async(req,res)=>{
    // const creatercheck=iscreater(req,res);
    // const membercheck=ismember(req,res);
    const userid=getuserid(req,res);
    console.log(userid)
    try{
        const {projectid}=req.params;
        const projectcheck=await Project.findOne({"members._id":userid,"_id":projectid})
        if(projectcheck){
            const creater=await Project.findOne({"creater._id":userid,"_id":projectid})
            if(creater){
                res.status(200).json(projectcheck)
                console.log(1)
            }else{
                const projectdetails = await Project.findOne({_id:projectid})
                res.status(200).json(projectdetails)
                console.log(2)
                }
            }
        else{
            throw Error("You are not memeber of the project")
        }
    }catch(error){
        res.status(404).json({error: error.message})
    }
}


//join project with project code
const JoinProject = async(req,res)=>{
    const {code} = req.body//use same variable name as body
    const user_id=getuserid(req,res);
    console.log(user_id)
    try{
        const projectmatch = await Project.findOne({'code':code});
        if(!projectmatch){
            throw Error("Project Code is not valid ")
        }
        // don't use curly 
        const membermatch= await Project.findOne({'code':code,'members._id':user_id});
        console.log(membermatch)
        if(membermatch){
            throw Error("Already a  member of the project can't join again")
        }else
        {
        const user=await Profile.findOne({'_id':user_id})
        const addmember = await Project.findOneAndUpdate(
                {code:code},
                {$push:{members:{_id:user_id,name:user.name}}},
                {new:true}
            )
            res.status(200).json({msg:`You have successfully joined project : ${projectmatch.title} `})
        }
    }catch(error){
        res.status(404).json({error: error.message})
    }
}



//Set designation for one project members
const SetDesignation = async(req,res)=>{
    const {projectid,memberid}=req.params//id is the object id of profile/user 
    const {designation}=req.body;//designattion is string designation obtained from user
    const user_id =getuserid(req,res);//getting user id to check if admin or not
    const creatercheck=iscreater(req,res);
    try{
        /*Checking if use of '' for property name to avoid unexpected token error
          findOne({id:id},{name:name}) means find with id show name
           findOne({id:id,name:name}) means findn with id and name and show all
        */
        const projectcheck= await Project.findOne({'_id':projectid,'members._id':memberid})
        console.log(creatercheck)
        if (!designation){
            throw Error("Enter the designation for the update")
        }
        if (!projectcheck){
            throw Error("No such project with provided members")
        };
        if(creatercheck){
            const setdesignation = await Project.findOneAndUpdate(
            //herer 'members._id' is valid but it updating no so using $set
            {'_id':projectid,'members._id':memberid},
            //use $set operator updating members.designation .$ gives index of object
            {$set:{"members.$.designation":designation}},
            {new:true}//new = true is necesssary for changed response
        )
         res.status(200).json(setdesignation)
        }else{
            throw Error("You are not allowed to set designations")
        }
    }
    catch(error){
        res.status(400).json({error:error.message})
     }
}


//function to get all project details that person is member of 
const getAllProjects=async(req,res)=>{
    const user_id=getuserid(req,res)
    try{
    // using "field name":0 in query omits field in the resulting query object
    const count = await Project.count({"members._id":user_id})
        if(count==0){
            throw Error('You have not joined/ created any project')
        }
        const projectmatch= await Project.find({"members._id":user_id},{'code':0})
        res.status(200).json(projectmatch)
    }catch(error){
        res.status(400).json({error:error.message})
    }

}


// Seting Deadlines
const SetDeadline = async(req,res)=>{
    const {projectid}=req.params//id is the object id of profile/user 
    const {deadline}=req.body;
    const userid=getuserid(req,res)
    try{
        /*Checking if use of '' for property name to avoid unexpected token error
          with findOne if findOne({id:id},{name:name}) works as or while findOne({id:id,name:name}) works as and
        */
       console.log(userid)
        const projectcheck= await Project.findOne({'_id':projectid},{"createdby._id":userid})
        if (!deadline){
            throw Error("Enter the deadline for the update")
        }
        if (!projectcheck){
            throw Error("No such project created by you")
        }
        const setdeadline= await Project.findOneAndUpdate(
            {'_id':projectid,'createdby._id':userid},
            {"deadline":deadline},
            {new:true})
         res.status(200).json({"deadline":setdeadline})
    }
    catch(error){
        res.status(404).json({error:error.message})
    }
}


const SendMail= async (req,res) => {
    const{projectid}=req.params
    const userid=getuserid(req,res)
    const{email,password}=req.body
    try{
        const creatercheck=await Project.findOne({'created._id':userid,"_id":projectid})
        const Projects= await Project.findOne({_id:projectid})
        const User=await Profile.findOne({_id:userid})
        console.log(User)
            if(!Project){
                throw Error("No such Project fouond")
            }
        if(creatercheck){
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: User.email,
                  pass: password
                }
              });
              console.log(User.email)
              // setup email data with unicode symbols
              const mailOptions = {
                from: User.email,
                to: email,
                subject: 'Code to Join Project',
                text: Projects.code
              };
              console.log(2)
              // send mail with defined transport object
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                } else {
                  res.status(200).json({message:`Email sent:  ${info.response}`});
                }
              });
        }else{
            throw Error("You are not the manager of the project")
        }
    }catch(error){
        res.status(400).json({error:error.message})
    }

}

const GetId= async (req, res) => {
    const userid= getuserid(req,res)
    try{
        res.status(200).json({userid:userid})
    }
    catch(error)
    {
        res.status(400).json({error:error.message})
    }
}

const CheckMember= async (req,res)=>{
    const{projectid}=req.params
    const userid=getuserid(req,res);
    try{
        const projectcheck= await Project.findOne({"members._id":userid,"_id":projectid})
        console.log(projectcheck)
        if(projectcheck){
            res.status(200).json({flag:true})
        }else{
            res.status(200).json({flag:false})
        }
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

const CheckCreater=  async (req,res)=>{
    const{projectid}=req.params
    const userid=getuserid(req,res);
    console.log(typeof(userid))
    try{
        const projectcheck= await Project.findOne({"createdby._id":userid,"_id":projectid})
        if(projectcheck){
            res.status(200).json({flag:true})
        }else{
            res.status(200).json({flag:false})
        }
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

const UpdateProject=  async (req,res)=>{
    const{projectid}=req.params
    const{iscomplete,deadline,details}=req.body
    const userid=getuserid(req,res);
    try{
        const projectcheck=await Project.findOne({"createdby._id":userid,"_id":projectid})
        if(projectcheck){
            const projectcreatercheck= await Project.findOne({"createdby._id":userid,"_id":projectid})
            if(projectcreatercheck){
                if(!iscomplete){
                    const projectcheck= await Project.findOneAndUpdate(
                    {"createdby._id":userid,"_id":projectid},
                    {
                    "details":details,
                    "deadline":deadline,
                    "completedflag":iscomplete},
                    {new:true})
                    res.status(200).json({message:"Project successfully updated"})
                }
                else{
                    const projectcheck= await Project.findOneAndUpdate(
                        {"createdby._id":userid,"_id":projectid},
                        {"completedflag":iscomplete,
                        "details":details,
                        "deadline":deadline,
                        "completedon":Date.now()},
                        {new:true})
                    res.status(200).json({message:"Congratulation Project successfully completed"})
                }
            }else{
                throw Error("You are not manager of this project")
            }
        }
        else{
            throw Error("No such project exists")
        }
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports={
    CreateProject,
    JoinProject,
    ViewProject,
    SetDesignation,
    getAllProjects,
    SetDeadline,
    SendMail,
    GetId,
    CheckMember,
    CheckCreater,
    UpdateProject,
    
}