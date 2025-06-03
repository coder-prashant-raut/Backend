import express from 'express';
import dotenv from 'dotenv';
import {connectDB }from './config/db.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config();
connectDB(); //connet to mangoDB

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());


app.use('/api', userRoutes)
 


app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
    
})