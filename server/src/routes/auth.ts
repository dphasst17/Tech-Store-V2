import express from "express";
import AuthController from "controllers/auth";
const router = express.Router();
const authController = new AuthController()
router.post('/login',authController.login)
router.post('/register',authController.register)
router.patch('/password',authController.password)
router.patch('/token',authController.newToken)
router.post('/forgot',authController.forgot)

export default router