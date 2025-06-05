
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';



// ---------------------
// 🔐 TOKEN GENERATORS
// ---------------------


//access token (short-lived, usede for api access)

const generateAccessToken = (userId) =>{
    return jwt.sign({id : userId}, process.env.JWT_SECRET, {
        expiresIn : '15m', // secure, short lifespan
    });
};

//refresh token {long-lived, used to get new access tokens}

const generateRefreshToken = (userId) =>{
    return jwt.sign({id: userId}, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '7d'
    });
};

// ---------------------
// 🧾 REGISTER CONTROLLER
// ---------------------


export const register = async (req, res, next) =>{
    try {
        const {name, email, password, role} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(400);
            throw new Error('User already exists')
        }

        const user = await User.create({name, email, password, role});

        // Token Generation

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // set refresh token in cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly : true,
            secure: process.env.NODE_ENV === 'production', // set true in prod (https)
            sameSite: 'strict',
            maxAge: 7 * 40 * 60 * 60 * 1000 ,  // 7days
        });

          // 🎯 Respond with access token and user details

          res.status(201).json({
            accessToken,
            user : {
                _id: user._id,
                name: user.name,
                email:user.email,
                role:user.role,
            },
          });

    } catch (error) {
        next(error)
    }
};



// ---------------------
// 🔑 LOGIN CONTROLLER
// ---------------------


export const login = async (req, res, next)=>{
    try {
        const {email, password} = req.body;
        
        const user = await User.findOne({email}).select('+password');
        if (!user || !(await user.matchPassword(password))) {
            res.status(401);
            throw new Error ('Invalid email or password');
        }

        // Generate Tokens

        const accessToken =  generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);
        

        // set refresh token in cookie

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure : process.env.NODE_ENV === ' production',
            sameSite : 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });


        //Respond with access token and user info

        res.json({
            accessToken,
            user:{
                _id : user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });


    } catch (error) {
        next(error)
    }
};

// ----------------------------
// 🔁 REFRESH TOKEN CONTROLLER
// ----------------------------

export const refreshAccessToken = (req, res, next) => {
    const token = req. cookie.refreshToken;

    if (!token) {
        res.status(401);
        return next(new Error('Refresh token not fount'))
    }

    try {
        const decoded = jwt-verify(token, process.env.JWT_REFRESH_SECRET);

        // Generate new access token using user;s ID

        const accessToken = generateAccessToken(decoded.id);

        // send back only the new access token

        res.json({accessToken})
    } catch (error) {
        res.status(403);
        return next(new Error('Invalid or expired refresh token'))
    }
}