const express = require('express');
//Importing the authorization function from middleware 
const {ReqAuth}= require("../middleware/auth.js")

//Importing the fuction from Project Controller
const{CreateProject,JoinProject,SetDesignation,getAllProjects,ViewProject,SetDeadline,SendMail, GetId,CheckMember,CheckCreater,UpdateProject}
=require("../controllers/ProjectController.js")


// Importing modules from auth middleware
const{ismember,isuser,getuserid}= require("../middleware/auth.js")
const router =express.Router();

// Routes for project handling
router.use(ReqAuth)
router.post('/create',CreateProject);
router.patch('/join',JoinProject);
router.patch('/setdesignation/:projectid/:memberid',SetDesignation)
router.get('/getall/',getAllProjects)
router.get('/view/:projectid',ViewProject)
router.patch('/setdeadline/:projectid',SetDeadline);
router.patch('/update/:projectid',UpdateProject)
router.post('/sendcode/:projectid',SendMail)

// Routes for member and creater testing modules
router.get('/getid',GetId)
router.get('/ismember/:projectid',CheckMember)
router.get('/iscreater/:projectid',CheckCreater)


module.exports = router;