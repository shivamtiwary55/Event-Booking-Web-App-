const User=require('../models/User');
const OTP=require('../models/OTP');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {sendOTPEmail}=require('../utils/email');

const generateToken=(id,role)=>{
    return jwt.sign({id,role},process.env.JWT_SECRET,{expiresIn:'7d'});
}

exports.registerUser=async (req,res)=>{
    const {name,email,password}=req.body;

//agr user login h tho find karega and agr nhi h tho null return karega
    let userExists=await User.findOne({email});
    if(userExists){
        return res.status(400).json({error:'User already exists with this email'});
    }

//yaha hum password ko hash kr rhe hai taki database me plain text password store na ho, security ke liye
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

//yaha hum naya user create kr rhe hai aur usko database me save kr rhe hai, agr save ho jata hai tho success message bhejenge, agr error aata hai tho error message bhejenge
    try{
        const user =await User.Create({
            name,
            email,
            password:hashedPassword,
            role:'user',
            isVerified:false
        });
       
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`OTP for ${email}: ${otp}`);
        
        await OTP.create({email, otp,action:'account_verification',});
        await sendOTPEmail(email, otp, 'account_verification');

        res.status(201).json({
            message:'User registered successfully. Please verify your email.',
            email:user.email
        });
        



        
    } catch(error){
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }

};

exports.loginUser=async(req,res)=>{
    const {email,password}=req.body;
    
    let user =await User.findOne({email});
    if(!user){
        return res.status(400).json({error:'Invalid email or password'});
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({error:'Invalid email or password'});
    }
    if(!user.isVerified && user.role==='user'){
        const otp=Math.floor(100000 + Math.random() * 900000).toString();
        await OTP.deleteMany({email,action:'account_verification'});
        await OTP.create({email,otp,action:'account_verification'});
        await sendOTPEmail(email,otp,'account_verification');
        return res.status(400).json({error:'Email not verified. A new OTP has been sent to your email.'});
    }
    res.json({
        message:'Login successful',
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        token:generateToken(user._id,user.role)
    });
    
};

exports.verifyOTP=async(req,res)=>{
    const {email,otp,action}=req.body;
    const otpRecord=await OTP.findOne({email,otp,action:'account_verification'});
    
    if(!otpRecord){
        return res.status(400).json({error:'Invalid OTP'});
    }

    const user= await User.findOneAndUpdate({email},{isVerified:true});
    await OTP.deleteMany({email,action:'account_verification'});
    res.json(
        {
            message:'Email verified successfully',
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id,user.role)
        }
        
        );
};