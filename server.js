import { config } from 'dotenv';
import express from 'express'
import dotenv from 'dotenv'

import connectDB from './config/db.js'

dotenv.config(); // loadeing environment variables 

const app = express()

app.use(express.json()) // parse incoming json


//connect DB

connectDB()

app.get('/', (req, res)=>{
    res.send("Backend Is live and connect to MongoDB ")
})

const PORT = process.env.PORT || 5000


app.listen(PORT , ()=>{
    console.log(`your project is running smoothly on PORT : ${PORT} This Port !`);
    
})