import mongoose from "mongoose";

const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT)
        console.log("Connected to MongoDB");
    }
    catch(e){
        console.log("Error connecting to MongoDB")
        console.log(e.message);
        
    }
}

export default dbConnect;