import { getPosts, postPost, findById, deleteUserPost, updatePost, getPostsByFriends, } from "../controllers/postController.js";
import { Router } from "express";
import protect from "../middleware/protect.js";
const PostRouter = Router();
PostRouter.get("/all", protect, getPosts)
    .get("/", protect, getPostsByFriends)
    .post("/", protect, postPost)
    .get("/:id", protect, findById)
    .delete("/:id", protect, deleteUserPost)
    .put("/:id", protect, updatePost);
export default PostRouter;
