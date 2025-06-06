import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {connectDB }from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js'


dotenv.config();
connectDB(); //connet to mangoDB

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cookieParser());


app.use('/api', userRoutes)
app.use('/api/auth', authRoutes);
 
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
    
})