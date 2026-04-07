const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const mongoose=require('mongoose');
const authRoutes=require('./routes/auth');



dotenv.config();

const app=express();
app.use(cors());

//Routes

app.use('/api/auth',authRoutes);

mongoose.connect(process.env.MONGO_URI)
   .then(()=>{
    console.log('Connected to MongoDB');
   }).catch((err)=>{    
    console.error('Error connecting to MongoDB:', err);
   });
   
//json file khud hi parse kr lega, humko manually parse krne ki jarurat nhi hai.
app.use(express.json());




const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});
