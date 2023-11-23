import User from "../model/user.model.js";
import bcryptjs from 'bcryptjs'

export const authtest = async (req, res) =>{

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
        res.status(201).json({message: "data stored successfully.."});

    } catch (error) {
        res.status(500).json(error.message)
        // res.json({message: "user already registered..."})
    }
    
}