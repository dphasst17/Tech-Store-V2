import express from "express";
import OrderController from "controllers/order";
import { verifyToken } from "middlewares/middle";
const router = express.Router();
const orderController = new OrderController()
router.get('/user',verifyToken,orderController.getByUser)
router.post('/',verifyToken,orderController.insertOrder)
router.patch('/',orderController.updateOrder)

export default router