import { Request, Response } from "express"
import UserModel from "../Models/UserModel.js"
import expressAsyncHandler from "express-async-handler"
import { hash, compare } from "bcrypt"
import "dotenv/config"
import jwt from "jsonwebtoken"

const genToken = (id: string) => {
  return jwt.sign(id, process.env.JWT_KEY!)
}

//POST a user

export const postUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      interface User {
        name: string
        password: string
        mail: string
        age: number
      }
      const { name, password, mail, age }: User = req.body
      if (!name || !password || !mail || !age) {
        res.status(400)
        throw new Error("Empty fields!")
      }
      const user = await UserModel.find({ mail })
      if (user.length > 0) {
        res.status(400)
        throw new Error("User already exist")
      }
      const hashedPassword = await hash(password, 10)
      const createdUser = await UserModel.create({
        name,
        password: hashedPassword,
        mail,
        age,
      })
      res.status(201).json({
        _id: createdUser._id,
        name: createdUser.name,
        mail: createdUser.mail,
        age: createdUser.age,
        friends: createdUser.friends,
        token: genToken(createdUser._id.toString()),
      })
    } catch (err: any) {
      res.status(400)
      throw new Error(err)
    }
  }
)

//Login a user

export const loginUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { mail, password } = req.body
      if (!mail || !password) {
        res.status(400)
        throw new Error("Empty fields")
      }
      const user = await UserModel.find({ mail })
      if (user.length == 0) {
        res.status(400)
        throw new Error("User doesn't exist!")
      }
      const comparedPassword = await compare(password, user[0].password)
      if (!comparedPassword) {
        res.status(400)
        throw new Error("Wrong password!")
      }
      res.status(200).json({
        _id: user[0]._id,
        name: user[0].name,
        mail: user[0].mail,
        age: user[0].age,
        fiends: user[0].friends,
        token: genToken(user[0]._id.toString()),
      })
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)

//Find user by Id

export const findUserById = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const userId: string = req.params.id
      const user = await UserModel.findById(userId).select("-password")
      if (!user) {
        res.status(400)
        throw new Error("User not found!")
      }
      res.status(200).json(user)
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)

//Find all users

export const findAllUsers = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const users = await UserModel.find().select("-password")
      res.status(200).json(users)
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)

//Put a user

export const putUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const userId: string = req.params.id
      const { password } = req.body
      if (password) {
        req.body["password"] = await hash(password, 10)
      }
      const newUser = await UserModel.findByIdAndUpdate(
        userId,
        req.body
      ).select("-password")
      res.status(200).json(newUser)
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)

//Delete a user

export const deleteUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.Id
      await UserModel.findByIdAndDelete(userId)
      res.status(202).json("User deleted Successfully")
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)

//Add a friend

export const addFriend = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const friendId = req.params.id
      const friendExists = await UserModel.findOne({ _id: req.user })
      friendExists?.friends.find((el) => {
        if (el.toString() === friendId) {
          res.status(400)
          throw new Error("Friend already exist")
        }
      })
      await UserModel.updateOne(
        { _id: req.user },
        { $push: { friends: friendId } }
      )
      res.status(200).json("Friend added successfully!")
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)

//Delete a friend

export const deleteFriend = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const friendId = req.params.id
      await UserModel.updateOne(
        { _id: req.user },
        { $pull: { friends: friendId } }
      )
      res.status(202).json("Friend deleted successfully!")
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)

//Get All friends of certain User[ID]

export const getFriends = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const friends = await UserModel.find({
        _id: req.user?.toString(),
      }).select("friends")
      res.status(200).json(friends)
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)

//Get friends by [ID]

export const getFriendById = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const userFriends = await UserModel.findById(id).select("friends")
      res.status(200).json(userFriends)
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)
