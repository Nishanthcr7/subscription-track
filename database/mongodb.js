import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if(!DB_URI){
    throw new Error('mongoDB url not found!');
}

const connectToDatabase = async () => {
    try{
        // await mongoose.connect(DB_URI);

        console.log('connect to db')
    }
    catch(err){
        console.error('Error connecting to database',err)

        process.exit(1);
    }
}

export default connectToDatabase
