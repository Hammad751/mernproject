import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js'
import User from '../model/user.model.js'

export const testapi = (req, res) =>{
    res.json({
        message: "router api is working",
    })
};

export const updateUser = async (req, res, next) =>{

    if(req.user.id !== req.params.id){
        // return res.status(403).json("you can only update your data");
        return next(errorHandler(401, "you can only update your account"));
    }
///////////
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const userData = req.body
        const updatedUser = await User.findByIdAndUpdate
        (req.params.id,
            {
                $set:{
                    username: userData.username,
                    email: userData.email,
                    password: userData.password,
                    profilePicture: userData.profilePicture,
                }
            },
            { new : true }
        );
        const { password, ...rest} = updatedUser._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}