import express from "express";
import mongoose from "mongoose"
import dotenv from  'dotenv'
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'

dotenv.config() 
const app = express();
app.use(express.json());

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

app.listen(port, () =>{
    console.log(`server is listening on port http://localhost:${port}`);
})