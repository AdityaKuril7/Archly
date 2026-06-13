import mongoose from "mongoose";

interface connectionObj {
    isConnected?: number;
}

const connection: connectionObj = {}

const connectDb = async () =>{
    try{
        if(connection.isConnected){
            console.log('Already connected');
            return
        }

        if(!process.env.MONGO_URI) return
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
        connection.isConnected = conn.connections[0].readyState

    }catch(e){
        console.log("Error: MongoDB Connected error",e);
    }
}

export default connectDb;