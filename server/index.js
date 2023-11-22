import express from "express";
import mongoose from "mongoose"
import dotenv from  'dotenv'

dotenv.config() 

const app = express();
const port = 8000;

try {
    mongoose.connect(process.env.MONGO)
    console.log("database connected...");
} 
catch (error) {
    console.log("connection error");
}

app.listen(port, () =>{
    console.log(`server is listening on port http://localhost:${port}`);
})