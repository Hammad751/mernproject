import express from "express";
import mongoose from "mongoose"
import dotenv from  'dotenv'
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
import cookieParser from "cookie-parser";
import path from "path"

dotenv.config()

const __dirname = path.resolve(); // this will get the dynamic directory name 
const app = express();

// in vite we create the build inside "dist" directory
app.use(express.static(path.join(__dirname, "/client/dist")))

// after creating the static path server send the response to the client
// at any point from client side, server send send the file 
app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

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