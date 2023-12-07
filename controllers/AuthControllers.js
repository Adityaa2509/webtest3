const bcrypt = require('bcrypt');
const User  = require("../models/User");
const JWT = require('jsonwebtoken');
const passport = require('passport');
const {} = require('../routes/AuthRoutes');
require('dotenv').config();

const RegisterController = async(req,res)=>{
    try{
        //get data
        const {username,email, password,cnfpassword} = req.body;
        //check if user already exist
        if(!username || !email || !password || !cnfpassword)
        {
            return res.status(400).json({
                success:false,
                message:'Please Fill all The Fields',
            });
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
          console.log(email);
            res.redirect('/api/auth/login');
            return ;
        }
        if(password != cnfpassword)
        {
            return res.status(400).json({
                success:false,
                message:'Password and Confirm Password Do not Match',
            });
        
        }

       // secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err) {
            return res.status(500).json({
                success:false,
                message:'Error inn hashing Password',
            });
        }

        //create entry for User
        const user = await User.create({
            username,email,password:hashedPassword
        })

        //res.render('home',{title:"HomePage"});
        res.redirect('/home');
        
    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be registered, please try again later',
        });
    }
    
}

function LoginController(req,resp,next){
    
    console.log(req.body.email);
    console.log(req.body.password);
    next();
}



module.exports = {RegisterController,LoginController};