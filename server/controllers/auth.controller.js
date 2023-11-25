import User from "../model/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const SignUp = async (req, res, next) =>{

    // destructure the body input by the user
    const { username, email, password} = req.body;

    // create hashpasswrod for making the password invisible
    const hashpasswrod = bcryptjs.hashSync(password, 10);

    // set value to the new variable called newuser
    // pass the values in user instance as an object
    const newUser = new User({username, email, password:hashpasswrod});

    try {
        // save the data in database
        // to save this, it can take much time to store data in database
        // so we use await method before saving the data
        await newUser.save();
        // server will throw the success status
        res.status(201).json({message: "data stored successfully..."});

    } catch (error) {
        // res.status(500).json(error.message)
        next(error);
    }
    
}

export const SignIn = async (req, res, next) =>{
    const {email, password} = req.body;
    try {
        // findOne is a method used to fined the data in database 
        //it is the method of mongoose db
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(401, "user not found"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401, "wrong credentials"));
        // after validation it generates the "token".
        // token is the hsh value generated from unique things form the user. e.g, email, id, name etc
        
        // create a token
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        const { password: hashedPassword, ...rest} = validUser._doc;
        
        // after generating the token, set the data to cookies
        // add the expiry data as well for that it sets after how much time it will regenerate the token

        const expiryDate = new Date(Date.now() + 60000);
        res.cookie('access_token', token,
            {
                httpOnly:true,
                expires:expiryDate
            }).status(200).json(rest)
    } catch (error) {
        next(error);
    }
}