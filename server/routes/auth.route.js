import express from "express";
import { authtest } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/signin', authtest)

export default router;