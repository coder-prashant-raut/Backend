import { config } from 'dotenv';
import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'

import connectDB from './config/db.js'


dotenv.config(); // loadeing environment variables 


//connect DB

connectDB()

const app = express()

app.use(express.json()) // parse incoming json


app.use("api/users", userRoutes);



app.get('/', (req, res)=>{
    res.send("Api is running ... ")
})

const PORT = process.env.PORT || 5000


app.listen(PORT , ()=>{
    console.log(`your project is running smoothly on PORT : ${PORT} This Port !`);
    
})