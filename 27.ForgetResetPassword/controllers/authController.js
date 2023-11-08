const User = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

exports.signup =  async(req, res,next)=>{
    try{
        const newUser = await User.create(req.body);
        const jwtToken=jsonwebtoken.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'30d'})
        return res.status(201).json({
            success:true,
            results:{newUser, jwtToken}
        })

    }catch(err){
        return res.status(400).json({
            success:false,
            error:"Error in creating new user "+err.message
        })
    }

}

exports.login = async(req, res,next)=>{
    try{
       
        const {email, password} = req.body;
        // console.log(email, password);
        if(!email || !password){
            return res.status(400).json({
                success:false,
                error:"Please provide email and password"
            })
        }
        const user = await User.findOne({email}).select('+password');
        // console.log("userData",user, password);
        if(!user){  
            return res.status(400).json({
                success:"failed",
                error:"User does not exist"
            })
        }

        const verified = await bcryptjs.compare(password, user.password, function(err, result) {
            if (err) {
              // Handle error
            //   console.log("1password MAtch")
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
        })
        
        


       
    }catch(err){
         return res.status(400).json({
            success:"failed",
            error:"Error in login new user "+err.message
        })
    }
}

exports.protectData = async(req, res, next)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({success:false,error:"Token is missing"})     
        }

        jsonwebtoken.verify(token,process.env.JWT_SECRET, async(err, decodedToken)=>{
            if(err){
                return res.status(401).json({success:false,error:"Token is invalid"})
            }
            // console.log("decodedToken",decodedToken)
            const user = await User.findById(decodedToken.id);
            if(!user){
                return res.status(401).json({success:false,error:"User is not found With Decoded Token"})
            }
           
            const passwordVerified = user.verifyPassword(decodedToken.iat);
            // console.log("passwordVerified",passwordVerified)
            if(passwordVerified){
               
                return res.status(200).json({success:true,error:"User changed password login again"})
            }
            // console.log(res.headersSent)
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json({success:false,error:"Unauthorized"})
    }
    
}


exports.accessDelete = (role)=>{
    return (req, res,next)=>{
        if(role === req.user.role){
            next();
        }else{
            return res.status(401).json({success:false, message:"You don't have permission to delete"})
        }
    }
}

exports.forgetPassword = async (req, res, next)=>{
    const user = await User.findOne({email:req.body.email});
    console.log("zzzzz",user)
    if(!user){
        return res.status(400).json({
            success:false,
            error:"User does not exist with this mail id"
        })

    }

    const resetToken = user.generatePasswordResetToken();
    await user.save({validateBeforeSave:false});
    const resetUrl = `${req.protocol}://${req.get("host")}/api/users/resetPassword/${resetToken}`;
    const body = "Forgot Password? Reset Password By calling given api: "+resetUrl;
    console.log(body)

  
    const transporter = nodemailer.createTransport({
        service:'gmail',
    auth: {
      user: process.env.emailUser,
      pass: process.env.emailPassword
    }
   
  });
  
  const mailOptions = {
    from:"pranavv481@gmail.com",
    to:"pranavverma550@gmail.com",
    subject: 'For Reset Password',
    text: 'Hello world?', // plain text body
    html: `<b>${body}</b>` // html body
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.status(400).json({status:false, message:"error in sending mail "+error})
    } else {
      console.log('Email Has Been Sent:-',info.response);
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      res.status(200).json({status:true, message:"Password reset link send to mail"})
    }
  });
    
    // next();
}

exports.resetPassword = async (req, res, next)=>{
    console.log("reeeeeees")
   
    const hashToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({ 
        passwordResetToken:hashToken,
        passwordResetExpires:{$gt:Date.now()}
    });
    console.log("hhh",hashToken)
    console.log("ccccc", user)
    if(!user){
        return res.status(400).json({
            success:false,
            error:"Password reset token is invalid or has expired"
        })
    }
    user.password=req.body.password
    user.passwordConfirm=req.body.passwordConfirm
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.passwordChangesDate = Date.now();

    await user.save();
    const jwtToken=jsonwebtoken.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'30d'})
    return res.status(200).json({
        success:true,
        id:user._id,
        results:jwtToken
    })

}


exports.changesPassword = async (req, res, next)=>{
    const user = await User.findById(req.user.id);
    if(!user){
        return res.status(404).json({
            success:false,
            error:"User not found"
        })
    }
    if(req.body.oldPassword){
        if(req.body.oldPassword === req.body.newPassword){
            return res.status(400).json({
                success:false,
                error:"New password should not be same as old password"
            })
        }
        const matched = await user.matchPassword(req.body.oldPassword);
        if(!matched){
            return res.status(400).json({
                success:false,
                error:"Old password does not match"
            })
        }
    }else{
        return res.status(400).json({
            success:false,
            error:"old password is required"
        })
    }
    // user.password = <PASSWORD>;
    // user.passwordConfirm = <PASSWORD>;
    // user.passwordChangesDate = Date.now();
    // await user.save();
    // const jwtToken=jsonwebtoken.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'3

}
