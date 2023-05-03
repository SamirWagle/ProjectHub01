const express = require('express');
//Importing the authorization function from middleware 
const {ReqAuth}= require("../middleware/auth.js")

//Importing the fuction from Project Controller
const{CreateResource,ViewResource}= require("../controllers/ResourceController.js")

const router =express.Router();

router.use(ReqAuth)
router.patch('/create/:projectid',CreateResource);
router.get('/view/:projectid',ViewResource);

module.exports = router;