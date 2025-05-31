import mongoose from "mongoose";


const UserSchema = new mongoose.Schema(
    {
        name : {
            type:String,
            required: [true, 'name is required !']
        },

        email : {
            type:String,
            required : [true, 'email is required !'],
            unique: true
        },
        password : {
            type: String,
            required : [true, 'password is requied !']
        },

    },{
        timestamps: true, // Adds Two Timestamps creatAt or UpdatedAt
    }
);

const User = mongoose.model('User', UserSchema);
export default User;