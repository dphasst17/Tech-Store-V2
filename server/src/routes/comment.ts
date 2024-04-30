import CommentController from "controllers/comment"
import express from "express"
const router = express.Router()
const commentController = new CommentController()

router.get("/",commentController.getAll)
router.get("/detail/:id",commentController.getByProduct)
router.post("/",commentController.insertComment)
router.patch("/",commentController.editComment)
router.delete("/",commentController.removeComment)
export default router