const {User}=require("../models/user.js");
const bcrypt= require("bcrypt")
const validator=require("validator")
const jwt =require("jsonwebtoken")

const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'1d'})
}

const SignUp= async(req,res)=>{
    const{email,password}=req.body;
    try{
        console.log(1)
        //Checking if fields are empty
        if(!email || !password){
            console.log(1)
            throw Error("All fields must be filled");
        }

        //Checking if email is valid
        if(!validator.isEmail(email)){
            console.log(2)
            throw Error("Please enter a valid email address")
        }

        //checking if password and email are same
        if (validator.equals(email,password)){
            console.log(3)
            throw Error("Password and email shouldn't be same");
        }
        
        //checking if password is strong
        if(!validator.isStrongPassword(password)){
            console.log(4)
            throw Error("Please enter a strong  password with minimum length 8 ,1 UpperCase 1,LowerCase,1 Number and 1 Special Character")
        }

        //Checking if email already exists
        const UserExists= await User.findOne({email})
        if(UserExists){
            console.log(5)
            throw Error('Error!! Email already exists')
        }


        const salt = await bcrypt.genSalt(10);//generating salt
        const hash= await bcrypt.hash(password,salt);//genreating hash
        const createuser= await User.create({email,password:hash})//creating new user
        const token= createToken(createuser._id);
        console.log(6)
        res.status(200).json({createuser,token});
    }
    catch(error){
        console.log(7)
        res.status(404).json({error:error.message})
    }
}


const Login = async (req, res) =>{
    const {email,password} = req.body;
    try{
        // console.log({email,password})
        //Checking if fields are empty
        if(!email || !password){
            throw Error("All fields must be filled");
        }
        //finging user obj with given email
        const loginuser= await User.findOne({email});
        if(!loginuser){
            throw Error("Incorrect Email")
        }''
        const check= await bcrypt.compare(password, loginuser.password);
        if(!loginuser || !check){
            throw Error("Invalid Login credentials");
        }
        const token= createToken(loginuser._id);
        const output={email,token}
        console.log({output})
        res.status(200).json(output);
    }catch(error){
        console.log(error);
        res.status(404).json({error:error.message})
}
}

module.exports={SignUp,Login}