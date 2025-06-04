import { User } from "../models/user.js";

//create user

export const createUser = async (req, res, next)=>{
   try {
      const {name, email} = req.body;
      const user = await User.create({name, email});
      res.status(201).json(user);
   } catch (error) {
      next(error); // pass error to centralized error handler middleware
   }
};


//get all users

export const getUsers = async (req, res, next) =>{
   try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit)|| 10;
      const skip = (page - 1) * limit ;


      const users = await User.find().skip(skip).limit(limit);
      const total = await User.countDocuments();

      res.json({
         users,
         page,
         pages: Math.ceil(total / limit),
         total,
      });

   } catch (error) {
     next(error);
   }
};


//update User

export const updateUser = async (req, res, next) =>{
   try {
      const {id} = req.params;
      const {name, email} = req.body;
      const user = await User.findByIdAndUpdate(id, {name, email}, {new : true})
      if(!user){
         res.status(404);
         throw new Error("User not fount");
      }
      res.json(user);

   } catch (error) {
     next(error);
   }
};

//delete user

export const deleteUser = async (req, res, next) =>{
   try {
      const {id} = req.params;
      await User.findByIdAndDelete(id);
      if(!deleteUser){
         res.status(404);
         throw new Error("User Not Found");
      }
      res.json({message : 'User deleted'});
   } catch (error) {
      next(error);
   }
};


//getme  


export const getme = async (req, res)=>{
   req.json({
id:req.user_id,
name: req.user.name,
email: req.user.email,
role:req.user.role,
   });
};


