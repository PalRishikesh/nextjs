import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        require:[true,'Please provie first name']
    },
    lastname:{
        type:String,
    },
    email:{
        type:String,
        require:[true,'Please provie first name'],
        unique:true
    },
    password:{
        type:String,
        require:[true,'Please provie first name']
    },
    isVerifed:{
        type:Boolean,
        default: false,
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry: Date,
});

// Return the old created users models or create new if not available

const User = mongoose.models.users || mongoose.model('users',userSchema);

export default User;
