const express = require('express');//import express module 
const dbConnect=require('./database/database.js');
const app =express();//creating express app
const bodyparser=require('body-parser');
const cors=require('cors');
dbConnect();
/*Port number selection 
IF defined in the port environment variable 
Else if not defined ie null ,0 or false will select the port number 8000
and store it in PORT const
*/
const PORT = process.env.PORT||5000;


// Setting Cors header 
app.use(cors());

// Allow requests from specific origin
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));

//port listening to info
const listen=() => {
    app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Listening on Port ${PORT}`);
})}

//middleware for additonal request info
const middleware=()=>{
    app.use(express.json());
    app.use((req, res,next) => {
        console.log(`${req.path} and ${req.method}`);
        next();
    })
}    

const parser=()=>{
app.use(bodyparser.urlencoded({ extended: true }));
}
/*functions to listen ,middle ware and database connections
  that are called when app is imported
*/
listen();
middleware();

module.exports =app;
