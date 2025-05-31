import { config } from 'dotenv';
import express from 'express'
import dotenv from 'dotenv'
dotenv.config();

const app = express()

app.use(express.json())


app.get('/', (req, res)=>{
    res.send("Welcome to Chai Or code ")
})

const PORT = process.env.PORT || 5000


app.listen(PORT , ()=>{
    console.log(`your project is running smoothly on PORT : ${PORT} This Port !`);
    
})