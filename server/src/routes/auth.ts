import express from "express";
import AuthController from "controllers/auth";
import { verifyToken } from "middlewares/middle";
const router = express.Router();
const authController = new AuthController()
router.post('/login',authController.login)
router.post('/register',authController.register)
router.patch('/password',verifyToken,authController.password)
router.patch('/token',verifyToken,authController.newToken)
router.post('/forgot',authController.forgot)

export default router