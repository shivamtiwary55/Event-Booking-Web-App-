const mongoose=require('mongoose');


//yaha hum otp ke liye schema bana rhe hai, jisme email, otp, action aur createdAt fields hai, action field se pata chalega ki otp kis purpose ke liye generate hua hai, createdAt field se pata chalega ki otp kab generate hua hai aur expires option se otp kab expire hoga
const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    action:{
        type:String,
        enum:['account_verification','event_booking'],
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:300 //5 minutes ke baad otp automatically delete ho jayega 
    }
});

module.exports=mongoose.model('OTP',otpSchema);

