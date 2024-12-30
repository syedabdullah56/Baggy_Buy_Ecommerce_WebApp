const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")
const crypto=require("crypto")


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        minLength:[4,"Name should have 4 characters"],
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter valid email"],
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password should have atleast 8 characters"],
        maxLength:[20,"Password cannot exceed 20 characters"],
        select:false,

    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    role:{
        type:String,
        default:"user",
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
})

// JWT TOKEN
userSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};

// Comparing password
userSchema.methods.comparePassword=async function(enteredPassword){
   return await bcrypt.compare(enteredPassword,this.password);
}

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken=function(){
    // Generating Reset password Token
    const resetToken=crypto.randomBytes(20).toString("hex");

    // Hashing and adding reset password token to user schema
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire=Date.now()+15*60*1000;


    return resetToken;
}
    

module.exports=mongoose.model("User",userSchema);     