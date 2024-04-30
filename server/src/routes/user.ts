import express from "express";
import UserController from "controllers/user";
import { verifyToken } from "middlewares/middle";
const router = express.Router();
const userController = new UserController()

router.get('/',verifyToken,userController.getUser)
router.patch('/',verifyToken,userController.userUpdate)

export default router