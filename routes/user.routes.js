import Router from "express";
import UserController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/users",authMiddleware, UserController.getAllUsers);

router.post("/users",authMiddleware, UserController.addUser);

router.get("/users/:id",authMiddleware, UserController.getUser);

router.put("/users/:id",authMiddleware, UserController.updateUser);

router.delete("/users/:id",authMiddleware,UserController.deleteUser);


export default router;