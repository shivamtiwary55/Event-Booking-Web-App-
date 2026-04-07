const mongoose =require('mongoose');
//Yaha bas humne ek user schema banaya hai jisme name, email, password, role, aur isVarified fields hain.
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isVarified:{
        type: Boolean,
        default: false
    }
});