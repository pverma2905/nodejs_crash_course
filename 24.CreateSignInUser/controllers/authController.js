const User = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

exports.signup =  async(req, res,next)=>{
    try{
        const newUser = await User.create(req.body);
        const jwtToken=jsonwebtoken.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'30d'})
        res.status(201).json({
            success:false,
            results:{newUser, jwtToken}
        })

    }catch(err){
        res.status(400).json({
            success:"failed",
            error:"Error in creating new user "+err.message
        })
    }

}

exports.login = async(req, res,next)=>{
    try{
       
        const {email, password} = req.body;
        console.log(email, password);
        if(!email || !password){
            return res.status(400).json({
                success:"failed",
                error:"Please provide email and password"
            })
        }
        const user = await User.findOne({email}).select('+password');
        console.log("userData",user, password);
        if(!user){  
            res.status(400).json({
                success:"failed",
                error:"User does not exist"
            })
        }

        const verified = await bcryptjs.compare(password, user.password, function(err, result) {
            if (err) {
              // Handle error
              console.log("1password MAtch")
            return  res.status(400).json({
                success:"failed",
                error:err
            })
            } else if (result) {
              // Passwords match
              console.log("2password MAtch")
              const jwtToken=jsonwebtoken.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'30d'})
        
       
            return res.status(200).json({
                  success:true,
                  results:jwtToken
              })
            } else {
                console.log("3password MAtch")
              // Passwords don't match
            return  res.status(400).json({
                success:"failed",
                error:"Password Not Match"
            })
          }
        console.log("userData1",verified);
        })
        
        


       
    }catch(err){
        res.status(400).json({
            success:"failed",
            error:"Error in login new user "+err.message
        })
    }
}


