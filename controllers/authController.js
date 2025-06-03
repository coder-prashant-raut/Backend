import { User } from "../models/user.js";
import jwt from 'jsonwebtoken';

const generateToken = (userId) =>{
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn : '7d'
    });
};

//register

export const register = async (req, res, next)=>{
    try {
        const {name, email, password}  = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(400);
            throw new Error('User already exists');
        }

        const user = await User.create({name, email, password});


        res.status(201).json({
            _id: user._id,
            name : user.name,
            email: user.email,
            token: generateToken(user._id),
        });
      } catch (error) {
        next(error);
    }
};

//login 
export const login = async (req, res, next) =>{
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email}).select('+password');

        if(!user || !(await user.matachPassword(password))) {
            res.status(401);
            throw new Error('Invalid email or password')
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token :generateToken(user._id),
        });





    } catch (error) {
        next(error)
    }
};

