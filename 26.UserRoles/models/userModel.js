const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema =  new mongoose.Schema({
    name: { 
        type : String,
        required: [true, 'username is required' ]
     },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        validator:[validator.isEmail, 'Please Enter a valid email']
    },
    password:{
        type:String,
        required:[true, "User Password is required"],
        minLength:8
    },
    passwordConfirm:{
        type:String,
        required:[true,"password confirmation field is required"],
        minLength:8,
        validate: {
            validator: function(value) {
                return value === this.password;
            },
            message: "Passwords are not the same"
        }
        
    },
    photo:String,
    passwordChangesDate:{
        type:Date,
        required:[true,"passwordChangesDate field is required"], 
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    }
    
});

// it will run before saving the user to the database bcrypt the password and remove the passwordConfirm field
userSchema.pre("save", async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
        this.passwordConfirm = undefined;
    }
    next();
})

// it will run before returning the user to the client and delete the password field
userSchema.methods.toJSON = function(){
    const obj = this.toObject();
    delete obj.password;
    return obj;
}

userSchema.methods.verifyPassword= function(jwtTimeStamp){
    if(this.passwordChangesDate){
        const convertDate = parseInt(this.passwordChangesDate.getTime()/1000);
        return convertDate > jwtTimeStamp;
    }
    return false;
}

const User = mongoose.model('User', userSchema);
module.exports = User






    
  




