import jwt from "jsonwebtoken"
import "dotenv/config"
import expressAsyncHandler from "express-async-handler"
import { Request, Response, NextFunction, RequestHandler } from "express"
import UserModel from "../Models/UserModel.js"

const protect: RequestHandler = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1]
        const userToken = jwt.verify(token, process.env.JWT_KEY!)
        const userById = await UserModel.findById(userToken)
        req.user = userById?._id.toString()
        next()
      } catch (error) {
        res.status(401)
        throw new Error("Not authorized, no token")
      }
    }
    if (!token) {
      res.status(401)
      throw new Error("Unauthorized, No token")
    }
  }
)

export default protect
