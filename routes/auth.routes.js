import Router from "express";
import { register, login, getAuthUser} from "../controllers/auth.controller.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

/* router.get("/isAlive", isAlive); */

router.get("/authUser", authMiddleware, getAuthUser);



export default router;
