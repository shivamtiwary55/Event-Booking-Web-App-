// yaha hum email bhejne ke liye nodemailer ka use karenge aur dotenv ka use karenge environment variables ko manage karne ke liye. 
// Is file mein hum ek transporter create karenge jo Gmail
// service ka use karega aur authentication ke liye environment variables se email user aur password lega.
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
//yaha hum ek function export kar rahe hain jiska naam 
// sendOtpEmail hai, jo email, otp, aur type parameters 
// leta hai. Is function ke andar hum mailOptions object 
// create karte hain jisme sender ka email, recipient ka email, subject, aur text message define kiya jata hai.
//  Phir hum transporter.sendMail() method ka use karke email bhejte hain.
exports.sendOtpEmail = async(email, otp, type) => {
    try{
        const mailOptions = {
        from: process.env.EMAIL_USER,
        to:email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`,
    };
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email} for ${type}`);
    } catch (error) {
        console.error(`Error sending OTP email to ${email} for ${type}:`, error);

    }
    
};
