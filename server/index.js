const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const mongoose=require('mongoose');
const authRoutes=require('./routes/auth');

const eventsRoutes=require('./routes/events');
const bookingsRoutes=require('./routes/bookings');



dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());

//Routes

app.use('/api/auth',authRoutes);
app.use('/api/events',eventsRoutes);
app.use('/api/bookings',bookingsRoutes);


mongoose.connect(process.env.MONGO_URI)
   .then(()=>{
    console.log('Connected to MongoDB');
   }).catch((err)=>{    
    console.error('Error connecting to MongoDB:', err);
   });
   



const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});
