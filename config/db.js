import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            
    });
        console.log(`MongoDB Connect on ${conn.connection.host}`);
        
        
    } catch (error) {
    console.error(`mongodb connection failedd ${error.message}`);
    process.exit(1); //exit the proccess on failure
    }
}

export default connectDB