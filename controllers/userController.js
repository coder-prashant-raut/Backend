import { response } from "express";
import User from "../models/user.js";


export const registerUser = async (req, res )=>{
    try {
        const { name , email , password} = req.body;
        //simple validation

        if(!name || !email || !password){
            return response.status(400).json({message : 'All Fileds are required'})
        }

        // check if user alredy exist

         const userExists = await User.findOne({email});

         if(userExists){
            return res.status(409).json({message : 'user Already Exists'})
         }

         //create new user

         const newUser = await User.create({name, email, password});


         res.status(201).json({
            message : 'User Registered Successfully !!',
            User:{
                id : newUser._id,
                name :  newUser.name,
                email : newUser.email
            }
         });


    } catch (error) {
        res.status(500).json({ message :'Server Error', error : error.message})
    }
};

