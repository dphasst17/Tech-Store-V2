import express from "express";
import TransportController from "controllers/transport";
import { verifyToken } from "middlewares/middle";
const router = express.Router();
const transportController = new TransportController
router.get('/user',verifyToken,transportController.getByUser)
router.post('/add',verifyToken,transportController.insertTran)

export default router