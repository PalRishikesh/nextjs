import { error } from "console";
import mongoose from "mongoose";
import toast from "react-hot-toast";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!) // We are adding ! means we are sure that value will alway be there
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("Mongo DB connected successfully");
            
        });

        connection.on('error',(err) => {
            console.log("MongoDB connection ",err);
            toast.error("MongoDB connection Error");
            
        });
    } catch (error:any) {
        toast.error("DB Error");
        console.log("Connection Error: ",error);        
    }
}