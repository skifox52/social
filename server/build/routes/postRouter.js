import { getPosts, postPost, findById, deleteUserPost, updatePost, } from "../controllers/postController.js";
import { Router } from "express";
import protect from "../middleware/protect.js";
const PostRouter = Router();
PostRouter.get("/", protect, getPosts)
    .post("/", protect, postPost)
    .get("/:id", protect, findById)
    .delete("/:id", protect, deleteUserPost)
    .put("/:id", protect, updatePost);
export default PostRouter;
