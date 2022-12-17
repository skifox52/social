import {
  loginUser,
  postUser,
  findUserById,
  findAllUsers,
  putUser,
  deleteUser,
} from "../controllers/userController.js"
import { Router } from "express"
import protect from "../middleware/protect.js"

const UserRouter = Router()

UserRouter.post("/register", postUser)
  .post("/login", loginUser)
  .get("/:id", protect, findUserById)
  .get("/", protect, findAllUsers)
  .put("/:id", putUser)
  .delete("/:id", deleteUser)

export default UserRouter
