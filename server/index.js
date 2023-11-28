import express from "express";
import mongoose from "mongoose"
import dotenv from  'dotenv'
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
import cookieParser from "cookie-parser";

dotenv.config() 
const app = express();
app.use(express.json());
app.use(cookieParser())
const port = 8000;

try {
    mongoose.connect(process.env.MONGO)
    console.log("database connected...");
} 
catch (error) {
    console.log("connection error");
}

app.use('/server/user', userRoute);
app.use('/server/auth', authRoute);

// add middleware in function calling
app.use((err, req, res, next) => {
    const statuscode = err.statusCode || 500
    const message = err.message || "internal system error"

    return res.status(statuscode).json({
        success: false,
        message,
        statuscode
    })
    // res.status(statuscode).json(err.message)
})

app.listen(port, () =>{
    console.log(`server is listening on port http://localhost:${port}`);
})