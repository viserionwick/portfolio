import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const { connection } = await mongoose.connect(`${process.env.MONGODB_URI}`)

        if (connection.readyState === 1) {
            return Promise.resolve(true)
        }
        
        await mongoose.disconnect();
        return Promise.resolve(false);
        
    } catch (error) {
        return Promise.reject(error)
    }
}

export default dbConnect;