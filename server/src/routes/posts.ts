import express from "express"
import PostsController from "controllers/posts"
const router = express.Router()
const postController = new PostsController()

router.get("/",postController.getAll)
router.get("/detail/:id",postController.getDetail)
router.get("/category",postController.getCategory)
router.post("/",postController.insertPost)
router.patch("/",postController.updatePost)
export default router