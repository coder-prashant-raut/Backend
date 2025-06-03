import { User } from "../models/user.js";

//create user

export const createUser = async (req, res)=>{
   try {
      const {name, email} = req.body;
      const user = await User.create({name, email});
      res.status(201).json(user);
   } catch (error) {
      res.status(500).json({error : error.message});
   }
};


//get all users

export const getUsers = async (req, res) =>{
   try {
      const users = await User.find();
      res.json(users);
      
   } catch (error) {
      res.status(500).json({error: error.message})
   }
};


//update User

export const updateUser = async (req, res) =>{
   try {
      const {id} = req.params;
      const {name, email} = req.body;
      const user = await User.findByIdAndUpdate(id, {name, email}, {new : true})
      res.json(user);

   } catch (error) {
      res.status(500).json({error :  error.message})
   }
};

//delete user

export const deleteUser = async (req, res) =>{
   try {
      const {id} = req.params;
      await User.findOneAndDelete(id);
      res.json({message : 'User deleted'});
   } catch (error) {
      res.status(500).json({error : error.message})
   }
};