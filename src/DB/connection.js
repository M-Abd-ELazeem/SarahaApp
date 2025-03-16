import mongoose from "mongoose";



const connectDB = async () => {
    await mongoose.connect(process.env.DB_URI).then(res => {
        console.log("Connect db");
    }).catch(err => {
        console.err("failed to connect");
    })
}

export default connectDB