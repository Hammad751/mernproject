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

      var user=  await newUser.save();

        // server will throw the success status
        // res.status(201).json({message: "data stored successfully..."});

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
        var jsonResponse={
            "status":200,
            "messgae":"User Created",
            "token":token,
        };
        res.status(200).json(jsonResponse);
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
        
        // create a token from user id and secret key
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


// this will call if the user does not exist
// system will get the body object and destructure the data, system required. 
// e.g, email, name password, profilePic

export const google = async (req, res, next) => {
    try {
        // find user with its email
        const user = await user.findOne({email: req.body.email});

        // if user exists get its data
        if(user){
            // here create the token
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            // remove the password from the user data
            const { password: hashedPassword, ...rest } = user._doc;
            // get the expiry date
            const expiry = new Date(Date.now() + 60000);

            // set the cookies, when the token will expire
            res.cookie('access_token', token, 
            {
                httpOnly:true,
                expires:expiry
            })
        }
        else{
            // generate the random password
            const generatedPassword = (Math.random()).toString(36).slice(-8) + (Math.random()).toString(36).slice(-8);
            // encrypt the generated passsword
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            // generate another random number to make a name unique from others
            // const userIdName = (Math.floor(Math.random())) * 10000;
            const userIdName = (Math.random()).slice(-8);
            // set the body object in avriable
            const userData = req.body;
            // set the user data in the database fields
            const newUser = new User(
            {
                username: userData.name.split(" ").join("").toLowerCase()+userIdName.toString(), 
                email:userData.email, 
                password: hashedPassword,
                profilePicture: userData.photo
            });

            // save the data the database
            await newUser.save();

            // create the token if user is not in the database using userID and with secret key
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);

            // hide the password getting from user input data
            const { password: hashedPassword2, ...rest } = newUser._doc;

            // get the expiry date
            const expiry = new Date(Date.now() + 60000);
            // cookies the server with responde status
            res.cookie('access_token', token, {
                httpOnly: true,
                expires: expiry,
            }).status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
}