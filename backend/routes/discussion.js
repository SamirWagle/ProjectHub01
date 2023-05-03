const express = require('express');
//Importing the authorization function from middleware 
const {ReqAuth}= require("../middleware/auth.js")

//Importing the fuction from Project Controller
const{SendMessage,SeeMessage}= require("../controllers/DiscussionController.js")

const router =express.Router();

router.use(ReqAuth)
router.patch('/send/:projectid',SendMessage);
router.get('/see/:projectid',SeeMessage);

module.exports = router;