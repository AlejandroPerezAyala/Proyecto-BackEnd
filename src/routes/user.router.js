import { Router } from "express";
import passport from "passport";
import { getUser, forgotPassword } from "../controllers/users.controller.js";

const router = Router()

router.get('/', passport.authenticate('jwt', {session: false}), getUser)
router.get('/forgotpassword', forgotPassword)

export default router