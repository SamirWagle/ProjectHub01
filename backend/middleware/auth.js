const jwt= require('jsonwebtoken');
const {User,Profile}=require('../models/user.js');
const{Project}=require('../models/project.js');
const{Discussion}=require('../models/discussion.js');

// next call next handlers after this funcion is executed
//Verifying the Authentication
const ReqAuth=async (req,res,next)=>{
    const{authorization}=req.headers;
    if(!authorization){
        return res.status(400).json({error: 'Authorization Token not provided'});
    }

    //getting the actual token from authorization bearer token
    const token=authorization.split(' ')[1];

    try{
        // grabs the id in payload from token
       const{_id}= jwt.verify(token,process.env.SECRET);
       /*to get user document by _id and add it to the req object
         we use .select('_id') to select id from user document
       */
       req.user= await User.findOne({_id}).select('_id' )
       next()
    }
    catch(error){
        res.status(401).json({error:"Request not authorized"});
    }
}


const getuserid=(req, res)=>{
    const {authorization} = req.headers;
    const token =authorization.split(' ')[1];
    const{_id}=jwt.verify(token,process.env.SECRET);
    return _id;
}
''

module.exports = {ReqAuth,getuserid};