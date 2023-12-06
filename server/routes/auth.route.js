import express from "express";
import { SignIn, SignUp, google, signout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/signup', SignUp)
router.post('/signin', SignIn)
router.post('/google', google)
router.get('/signout', signout)

export default router;