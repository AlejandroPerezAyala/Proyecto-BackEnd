import { Router } from "express";
import passport from "passport";
import { getUser } from "../controllers/users.controller.js";

const router = Router()

router.get('/', passport.authenticate('jwt', {session: false}), getUser)

export default router