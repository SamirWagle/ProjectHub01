/*Require .env module and
attach environment variables to process.env from .env file
*/
require('dotenv').config();
//import mongoose module
const mongoose=require('mongoose');

//connecting databse server
const dbConnect= async ()=>{
    try{
        mongoose.connect(process.env.DATABASE).then(()=>{
        console.log("Database connection established")
    })
    }catch(error){
        console.log(`DataBase Connection Failed due to error: ${error}`);
    }
}
module.exports=dbConnect;