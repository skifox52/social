import { loginUser, postUser, findUserById, findAllUsers, putUser, deleteUser, addFriend, deleteFriend, getFriends, getFriendById, } from "../controllers/userController.js";
import { Router } from "express";
import protect from "../middleware/protect.js";
const UserRouter = Router();
UserRouter.post("/register", postUser)
    .post("/login", loginUser)
    .get("/:id", protect, findUserById)
    .get("/friends/all", protect, getFriends)
    .get("/friends/:id", protect, getFriendById)
    .get("/", protect, findAllUsers)
    .put("/:id", putUser)
    .delete("/:id", deleteUser)
    .post("/friends/:id", protect, addFriend)
    .delete("/friends/:id", protect, deleteFriend);
export default UserRouter;
