import { Router } from "express";
import { createPreference } from "../controllers/checkout.controller.js";

const router = Router()

router.post('/', createPreference)

export default router