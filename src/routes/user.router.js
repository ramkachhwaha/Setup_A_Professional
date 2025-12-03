import { Router } from "express";
import { ragisterUser } from "../controllers/user.controller.js";

const router = Router();

router.router("register").post(ragisterUser)


export default router;